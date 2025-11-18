const {Room} = require('../models/room');
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


// name description mechanicname service available  locality address city mobile 

router.get(`/`,  async (req, res) =>{
    const roomList = await Room.find();

    if(!roomList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(roomList);
})



router.get(`/:id`, async (req, res) =>{
    const roomList = await Room.findById(req.params.id);

    if(!roomList) {
        res.status(500).json({success: false})
    } 
    res.send(roomList);
})


router.post('/',  async (req,res)=>{
    let room = new Room({
        
        owneremail: req.body.owneremail,
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        vacancy: req.body.vacancy,   

    })
    room = await room.save();

    if(!room)
    return res.status(400).send('the room cannot be created!')
    res.send(room);
    
})

// PUT - Update a room by ID
router.put('/:id',async (req, res)=> {
    const room = await Room.findByIdAndUpdate(
        req.params.id,
        {        
            name: req.body.name,
            type: req.body.type,
            price: req.body.price,
            vacancy: req.body.vacancy, 
        },
        { new: true}
    )

    if(!room)
    return res.status(400).send('the room cannot be created!')

    res.send(room);
})




// DELETE - Delete a room by ID
router.delete('/:id', async (req, res) => {
    try {
        const roomId = req.params.id;

        const room = await Room.findByIdAndDelete(roomId);

        if (!room)
            return res.status(404).send('Room not found');

        res.send('Room deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


// PUT route to update the status and upload an image for a Room
router.put('/upload_image/:id', auth, upload.single('image'), async (req, res) => {
    try {
      const roomId = req.params.id;
      //const { status, reason, remedies, notes } = req.body;
      const image = req.file ? req.file.path : undefined;
  
      // Find the Room by ID and update its status and image path
      const updatedRoom = await Room.findByIdAndUpdate(
        roomId,
        { $set: {image } },
        { new: true } // To return the updated document
      );
  
      if (!updatedRoom) {
        return res.status(404).json({ success: false, message: 'Room not found' });
      }
  
      res.status(200).json({ success: true, message: 'Room status and image updated successfully', room: updatedRoom });
    } catch (error) {
      console.error('Error updating Room status and image:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });





{/*
router.post('/status/:id', auth, async (req, res)=> {
    const room = await Room.findByIdAndUpdate(
        req.params.id,
        {        
            status: req.body.status,
            
        },
        { new: true}
    )

    if(!room)
    return res.status(400).send('the room cannot be created!')

    res.send(room);
})



router.put('/map/:id',async (req, res)=> {
    const booking = await Location.findByIdAndUpdate(
        req.params.id,
        {        
            lat: req.body.lat,
            long: req.body.long
        },
        { new: true}
    )
    if(!booking)
    return res.status(400).send('the business cannot be created!')

    res.send(booking);
})

*/}
module.exports =router;