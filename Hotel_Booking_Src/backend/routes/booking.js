
const {Booking} = require('../models/booking');
const {Room} = require('../models/room.js');

const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');
// Get all bookings
router.get('/', async (req, res) => {
    try {
        const bookingList = await Booking.find();
        res.status(200).json(bookingList);
    } catch (error) {
        console.error('Error fetching booking data:', error.message);
        res.status(500).json({ message: 'Failed to fetch booking data' });
    }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        console.error('Error fetching booking data:', error.message);
        res.status(500).json({ message: error.message });
    }
});



router.post('/', async (req, res) => {
    try {
        // Create a new booking
        const booking = new Booking({
            owneremail: req.body.owneremail,
            email: req.body.email,
            name: req.body.name,
            vacancy: req.body.vacancy,
            type: req.body.type,
            price: req.body.price,
            cusname: req.body.cusname,
            personcount: req.body.personcount,
            mobile: req.body.mobile,
            address: req.body.address,
            amount: req.body.amount
        });

        // Save the booking
        const savedBooking = await booking.save();

        // If the booking is not saved, return an error response
        if (!savedBooking) {
            return res.status(400).send('The booking cannot be created!');
        }

      // Find the room corresponding to the booking based on the name
        const room = await Room.findOne({ type: req.body.type, name: req.body.name });


        // If the room is not found, return an error response
        if (!room) {
            return res.status(404).send('Room not found');
        }

        // Update the vacancy in the room based on the personcount in the booking
        room.vacancy -= parseInt(req.body.personcount);

        // Save the updated room
        const updatedRoom = await room.save();

        // Return the saved booking
        res.send(savedBooking);
    } catch (error) {
        console.error('Error creating booking:', error.message);
        res.status(500).send('Internal Server Error');
    }
});



{/*
router.post('/', async (req, res) => {
    try {
      const {
        owneremail,
        email,
        name,
        vacancy,
        type,
        price,
        cusname,
        personcount,
        mobile,
        address
      } = req.body;
  
      // Create a new booking instance
      const booking = new Booking({
        owneremail,
        email,
        name,
        vacancy,
        type,
        price,
        cusname,
        personcount,
        mobile,
        address
      });

      // Vacany less or equal to personcount
      //  room.vacancy - personcount 
  
      // Save the booking to the database
      const result = await booking.save();

      // else vacany is less than the person count 
  
      // Respond with the created booking
      res.status(201).json(result);
    } catch (error) {
      // If an error occurs, send a 400 status code and the error message
      console.error('Error creating booking:', error);
      res.status(400).json({ error: 'An error occurred while creating the booking' });
    }
  });
*/}

router.put('/status/:id', auth, async (req, res)=> {
    const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        {         
            status: req.body.status,
            inTime: req.body.inTime,
            inDate: req.body.inDate,
            outTime: req.body.outTime,
            outDate: req.body.outDate,
            amount: req.body.amount,
            paid: req.body.paid,
            balance: req.body.balance
        },
        { new: true}
    )

    if(!booking)
    return res.status(400).send('the booking cannot be created!')

    res.send(booking);
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


module.exports =router;