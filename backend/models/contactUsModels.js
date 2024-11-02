const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    minlength: [2, 'Name must be at least 2 characters long.']
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    validate: {
      validator: function(value) {
        // Basic email regex validation
        return /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(value);
      },
      message: props => `${props.value} is not a valid email address.`
    }
  },
  phone: {
    type: String,
    minlength: [10, 'phone no. must be at least 10 characters long.']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required.'],
    minlength: [5, 'Subject must be at least 5 characters long.']
  },
  message: {
    type: String,
    required: [true, 'Message is required.'],
    minlength: [10, 'Message must be at least 10 characters long.']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
}
}, {timestamps: true});

const ContactUs = mongoose.model('Contact_us', contactUsSchema);

module.exports = ContactUs;