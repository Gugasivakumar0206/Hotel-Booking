const {Owner} = require('../models/owner');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res) =>{
    const ownerList = await Owner.find().select('-passwordHash');
    if(!ownerList) {
        res.status(500).json({success: false})
    } 
    res.send(ownerList);
})

router.get(`/:id`, async (req, res) =>{
    const ownerList = await Owner.findById(req.params.id);
    if(!ownerList) {
        res.status(500).json({success: false})
    } 
    res.send(ownerList);
})

router.post(`/`, async (req, res) =>{
    let owner = new Owner({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        city: req.body.city,
        question1: req.body.question1,
        question2: req.body.question2,
    })
    owner = await owner.save();
    if(!owner) 
    return res.status(500).send('The Owner cannot be created')

    res.send(owner);
})



router.post('/login', async (req,res) => {
    const owner = await Owner.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!owner) {
        return res.status(400).send('The owner not found');
    }

    if(owner && bcrypt.compareSync(req.body.password, owner.passwordHash)) {
        const token = jwt.sign(
            {
                owneremail: owner.email,
                isAdmin: owner.isAdmin
            },
            secret,
            {expiresIn : '1d'}
        )
       
        res.status(200).send({owner: owner.email , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }

    
})

router.put('/:id',async (req, res)=> {

    const ownerExist = await Owner.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = ownerExist.passwordHash;
    }

    const owner = await Owner.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            city: req.body.city,
        
        },
        { new: true}
    )

    if(!owner)
    return res.status(400).send('the owner cannot be created!')

    res.send(owner);
})


router.post('/reset_password', async (req, res) => {
    const { question1, question2, newPassword } = req.body;
  
    try {
      // Find the owner by email
      const owner = await Owner.findOne({ email: req.body.email });
  
      // Check if the owner exists
      if (!owner) {
        return res.status(404).json({ error: 'Owner not found' });
      }
      // Check if security questions match
      if (owner.question1 !== question1 ||  owner.question2 !== question2) {
        return res.status(400).json({ error: 'Security questions do not match' });
      }
            // Hash the new password
            
            const hashedPassword = bcrypt.hashSync(newPassword, 10);
            
            // Update the owner's password
            owner.passwordHash = hashedPassword;

            // Save the updated owner
            await owner.save();  
            res.status(200).json({ message: 'Password reset successful' });
            //res.send(owner);


    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



module.exports =router;