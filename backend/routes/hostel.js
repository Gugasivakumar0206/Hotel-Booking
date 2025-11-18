const {Hostel} = require('../models/hostel');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');
const multer = require('multer');


// Set up multer storage for storing uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });






router.get(`/`,  async (req, res) =>{
    const hostelList = await Hostel.find();

    if(!hostelList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(hostelList);
})



router.get(`/:id`, async (req, res) =>{
    const hostelList = await Hostel.findById(req.params.id);

    if(!hostelList) {
        res.status(500).json({success: false})
    } 
    res.send(hostelList);
})


router.post('/',  async (req,res)=>{
    let hostel = new Hostel({
        
        owneremail: req.body.owneremail,
        name: req.body.name,
        mobile: req.body.mobile,
        address: req.body.address,
        city: req.body.city,
        facility: req.body.facility,
        price: req.body.price,
        
       
        //status: req.body.status
    })
    hostel = await hostel.save();

    if(!hostel)
    return res.status(400).send('the hostel cannot be created!')
    res.send(hostel);
    
})



router.delete('/:id', auth, (req, res)=>{
    Hostel.findByIdAndRemove(req.params.id).then(hostel =>{
        if(hostel) {
            return res.status(200).json({success: true, message: 'the hostel is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "hostel not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})



router.put('/:id',async (req, res)=> {
    const hostel = await Hostel.findByIdAndUpdate(
        req.params.id,
        {        
            owneremail: req.body.owneremail,
            name: req.body.name,
            mobile: req.body.mobile,
            address: req.body.address,
            city: req.body.city,
            facility: req.body.facility,
            price: req.body.price,
        },
        { new: true}
    )

    if(!hostel)
    return res.status(400).send('the hostel cannot be created!')

    res.send(hostel);
})




router.put('/map/:id',async (req, res)=> {
    const hostel = await Hostel.findByIdAndUpdate(
        req.params.id,
        {        
            lat: req.body.lat,
            long: req.body.long
        },
        { new: true}
    )

    if(!hostel)
    return res.status(400).send('the hostel cannot be created!')

    res.send(hostel);
})



router.put('/status/:id', auth, async (req, res)=> {
    const hostel = await Hostel.findByIdAndUpdate(
        req.params.id,
        {        
            status: req.body.status
        },
        { new: true}
    )

    if(!hostel)
    return res.status(400).send('the hostel cannot be created!')

    res.send(hostel);
})





// PUT route to update the status and upload an image for a hostel
router.put('/upload_image/:id', auth, upload.single('image'), async (req, res) => {
    try {
      const hostelId = req.params.id;
      //const { status, reason, remedies, notes } = req.body;
      const image = req.file ? req.file.path : undefined;
  
      // Find the hostel by ID and update its status and image path
      const updatedHostel = await Hostel.findByIdAndUpdate(
        hostelId,
        { $set: {image } },
        { new: true } // To return the updated document
      );
  
      if (!updatedHostel) {
        return res.status(404).json({ success: false, message: 'hostel not found' });
      }
  
      res.status(200).json({ success: true, message: 'hostel status and image updated successfully', hostel: updatedHostel });
    } catch (error) {
      console.error('Error updating hostel status and image:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });




module.exports =router;