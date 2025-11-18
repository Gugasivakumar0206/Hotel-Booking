const mongoose = require('mongoose');


// name, email, password, phone, city, question1, question2

const ownerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    city: {
        type: String,
        default: ''
    },
    question1: {
        type: String,
        required: true,
    },
    question2: {
        type: String,
        required: true,
    }

});

ownerSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ownerSchema.set('toJSON', {
    virtuals: true,
});

exports.Owner = mongoose.model('Owner', ownerSchema);
exports.ownerSchema = ownerSchema;
