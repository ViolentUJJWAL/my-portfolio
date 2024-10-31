const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  title: {
    type: String,
    minlength: [2, 'Project title must be at least 2 characters long.'],
    required: [true, 'Project title is required.'],
  },
  description: {
    type: String,
    minlength: [50, 'Project description must be at least 2 characters long.'],
    required: [true, 'Project description is required.'],
  },
  image: {
    url: {
      type: String,
      required: [true, "Project image is required."],
      validate: {
        validator: function (v) {
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Validates URL format
        },
        message: props => `${props.value} is not a valid project image link URL!`
      },
    },
    public_id: {
      type: String,
      required: [true, "Project image is required."],
    }
  },
  link: {
    type: String,
    required: [true, 'Project link URL is required.'],
    validate: {
      validator: function (v) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Validates URL format
      },
      message: props => `${props.value} is not a valid project link URL!`
    }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required.']
  }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
