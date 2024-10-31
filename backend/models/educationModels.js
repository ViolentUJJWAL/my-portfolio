const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    course: {
        type: String,
        minlength: [2, 'course name must be at least 2 characters long.'],
        required: [true, "course is required"]
    },
    college: {
        type: String,
        minlength: [2, 'college name must be at least 2 characters long.'],
        required: [true, "college is required"]
    },
    location: {
        type: String,
        minlength: [2, 'location must be at least 2 characters long.'],
        required: [true, "location is required"]
    },
    start: {
        month: {
            type: Number,
            required: true,
            min: 1,
            max: 12
        },
        year: {
            type: Number,
            required: true,
            min: 1960,
            max: 2030
        }
    },
    end: {
        month: {
            type: Number,
            required: true,
            min: 1,
            max: 12
        },
        year: {
            type: Number,
            required: true,
            min: 1960,
            max: 2030,
            validate: {
                validator: function(v) {
                  return (this.start.year < v)
                },
                message: props => `${props.v} is smaller then start year`
            }
        }
    },
    status: {
        type: String,
        enum: ["completed", "pursuing"],
        default: "completed"
    },
    image: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Validates URL format
            },
            message: props => `${props.value} is not a valid project link URL!`
        },
        default: null
    },
    description: {
        type: String,
        minlength: [50, 'description must be at least 50 characters long.'],
        required: [true, "description is required"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "UserId is required"]
    }
}, { timestamps: true });


const education = mongoose.model('Education', educationSchema);
module.exports = education;
