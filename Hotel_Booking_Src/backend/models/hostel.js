const mongoose = require('mongoose');

const hostelSchema = mongoose.Schema({
    owneremail: {
        type: String,
        required: true,    
    },
    name: {
        type: String,
        required: true,    
    },
    mobile: {
        type: Number,
        required: true,  
    },
    address: {
        type: String,
        required: true,    
    },
    city: {
        type: String,
        required: true,    
    },
    facility: {
        type: String,
        required: true,    
    },
    price: {
        type: String,
        required: true,    
    },
    image: {
        type: String, // Assuming imagePath is a string containing the path to the image file
                         // Optional: Provide a default value if no image is uploaded
      },
    status:{
        type: String,
        default:'Pending'
    },
    lat: {
        type: Number,  
        default: 0,         
    },
    long: {
        type: Number,
        default: 0,   
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
})


hostelSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

hostelSchema.set('toJSON', {
    virtuals: true,
});


exports.Hostel = mongoose.model('Hostel', hostelSchema);
