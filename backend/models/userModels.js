const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [2, 'Name must be at least 2 characters long.'],
        required: [true, "Name is required"]
    },
    username: {
        type: String,
        minlength: [2, 'username must be at least 2 characters long.'],
        required: [true, "username is required"],
        unique: [true, "username is already exist"]
    },
    phoneno: {
        type: String,
        minlength: [10, 'phoneno must be at least 10 characters long.'],
        required: [true, "phone no. is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        validate: {
            validator: function (value) {
                // Basic email regex validation
                return /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address.`
        },
        unique: [true, "email already exists"]
    },
    about: {
        type: String,
        minlength: [100, 'about must be at least 100 characters long.'],
    },
    designation: {
        type: Array,
        default: []
    },
    profilrImage: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Validates URL format
            },
            message: props => `${props.value} is not a valid project link URL!`
        },
        default: null
    },
    logo: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Validates URL format
            },
            message: props => `${props.value} is not a valid project link URL!`
        },
        default: null
    },
    resume: {
        type: String,
        default: null,
        validate: {
            validator: function (v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Validates URL format
            },
            message: props => `${props.value} is not a valid project link URL!`
        }
    },
    address: {
        city: {
            type: String,
            minlength: [2, 'city name must be at least 2 characters long.'],
            required: [true, "city is required"]
        },
        state: {
            type: String,
            minlength: [2, 'state name must be at least 2 characters long.'],
            required: [true, "state is required"]
        },
        country: {
            type: String,
            minlength: [2, 'country name must be at least 2 characters long.'],
            required: [true, "country is required"]
        },
        pin: {
            type: String,
            minlength: [2, 'pin code must be at least 2 characters long.'],
            required: [true, "pin is required"]
        }
    },
    link: [
        {
            name: {
                type: String,
                minlength: [2, 'site name must be at least 2 characters long.'],
                required: [true, "site name is required in link"]
            },
            url: {
                type: String,
                required: [true, "url is required in link"],
                validate: {
                    validator: function (v) {
                        return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Validates URL format
                    },
                    message: props => `${props.value} is not a valid project link URL!`
                }
            },
            icon: {
                type: String,
                default: null,
                validate: {
                    validator: function (v) {
                        return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Validates URL format
                    },
                    message: props => `${props.value} is not a valid project link URL!`
                }
            }
        }
    ],
    password: {
        tryp: String,
        minlength: [6, 'password must be at least 6 characters long.'],
        required: [true, "password is required"],
        select: false
    },
    role: "user",
    otp: {
        type: String,
        default: null,
        select: false
    },
    otrExpiry: {
        type: String,
        default: null,
        select: false
    },
    otpVerify: {
        type: String,
        default: null,
        select: false
    },
    isActive: true
}, { timestamps: true });


const user = mongoose.model('User', userSchema);
module.exports = user;
