const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    company: {
        type: String,
        minlength: [2, 'Company Name must be at least 2 characters long.'],
        required: [true, 'Company name is required.'],
    },
    designation: {
        type: String,
        minlength: [2, 'Designation must be at least 2 characters long.'],
        required: [true, 'Designation is required.'],
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
            validate: {
                validator: function (v) {
                    return (v <= new Date().getFullYear()); // Checks if year is <= current year)
                },
                message: props => `${props.v} is invalid`
            }
        }
    },
    end: {
        type: mongoose.Schema.Types.Mixed,
        default: "Peresent",
        validate: {
            validator: function (v) {
                if (v === "Present") return true;
                if (v && typeof v === "object") {
                    const currentYear = new Date().getFullYear();
                    return (
                        v.month >= 1 && v.month <= 12 &&
                        v.year >= 1960 && v.year <= currentYear // Ensures end year is <= current year
                    );
                }
            },
            message: props => `${props.v} is invalid`
        },
    },
    description: {
        type: String,
        minlength: [50, 'description must be at least 2 characters long.'],
        required: [true, "description is required."]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required.']
    },
}, { timestamps: true })

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
