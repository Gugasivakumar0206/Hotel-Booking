const mongoose = require('mongoose');


const bookingSchema = mongoose.Schema({
    owneremail: {
        type: String,
        required: true,    
    },
    email: {
        type: String,
        required: true,    
    },
    name: {
        type: String,
        required: true,    
    },
    vacancy: {
        type: String,
        required: true,    
    } ,
    type: {
        type: String,
        required: true,    
    } ,
    price: {
        type: String,
        required: true,    
    } ,
    cusname: {
        type: String,
        required: true,    
    } ,
    personcount: {
        type: String,
        required: true,    
    } ,
    mobile: {
        type: String,
        required: true,    
    } ,
    address: {
        type: String,
        required: true,    
    } ,
    amount: {
        type: String,
        required: true,    
    } ,
    roomId: {
        type: String,
            
    } ,

    dateCreated: {
        type: Date,
        default: Date.now
    },
    
})

bookingSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

bookingSchema.set('toJSON', {
    virtuals: true,
});


exports.Booking = mongoose.model('Booking', bookingSchema);
