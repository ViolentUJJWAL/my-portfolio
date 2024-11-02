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
        url: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Validates URL format
                },
                message: props => `${props.value} is not a valid profilrImage link URL!`
            },
        },
        public_id: {
            type: String,
        }
    },
    logo: {
        url: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Validates URL format
                },
                message: props => `${props.value} is not a valid logo link URL!`
            },
        },
        public_id: {
            type: String,
        }
    },
    resume: {
        url: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Validates URL format
                },
                message: props => `${props.value} is not a valid resume link URL!`
            },
        },
        public_id: {
            type: String,
        }
    },
    address: {
        city: {
            type: String,
            minlength: [2, 'city name must be at least 2 characters long.'],
        },
        state: {
            type: String,
            minlength: [2, 'state name must be at least 2 characters long.'],
        },
        country: {
            type: String,
            minlength: [2, 'country name must be at least 2 characters long.'],
        },
        pin: {
            type: String,
            minlength: [2, 'pin code must be at least 2 characters long.'],
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
                required: [true, "icon link is required in ocon"],
                validate: {
                    validator: function (v) {
                        return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Validates URL format
                    },
                    message: props => `${props.value} is not a valid icon link URL!`
                }
            }
        }
    ],
    password: {
        type: String,
        minlength: [6, 'password must be at least 6 characters long.'],
        required: [true, "password is required"],
        select: false
    },
    role: {
        type: String,
        default: "user",
    },
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
    isActive: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });


const user = mongoose.model('User', userSchema);
module.exports = user;
