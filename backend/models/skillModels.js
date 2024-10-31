const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [2, 'skill name must be at least 2 characters long.'],
        required: [true, "Name is required"]
    },
    icon: {
        url: {
            type: String,
            required: [true, "skill icon is required."],
            validate: {
                validator: function (v) {
                    return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Validates URL format
                },
                message: props => `${props.value} is not a valid skill icon link URL!`
            },
        },
        public_id: {
            type: String,
            required: [true, "skill icon is required."],
        }
    },
    description: {
        type: String,
        default: ""
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "UserId is required"]
    }
}, { timestamps: true });


const skill = mongoose.model('Skill', skillSchema);
module.exports = skill;
