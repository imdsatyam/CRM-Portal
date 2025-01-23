const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNo: { type: String },
    address: { type: String },
    position: { type: String },
    facebookProfile: { type: String },
    twitterProfile: { type: String },
    instagramProfile: { type: String },
    linkedInProfile: { type: String },
    extraMobileNo: { type: String },
    guardianName: { type: String },
    guardianNo: { type: String },
    guardianEmail: { type: String },
    status: { type: String, default: 'active' },
}, { timestamps: true, 
    toJSON: { virtuals: true, transform: (doc, ret) => { delete ret.__v; } },
    toObject: { virtuals: true, transform: (doc, ret) => { delete ret.__v; } } 
});

module.exports = mongoose.model('User', userSchema);
