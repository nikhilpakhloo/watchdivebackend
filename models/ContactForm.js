import mongoose from "mongoose";

const contactFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true  // Enable automatic timestamping
});

const ContactForm = mongoose.model('ContactForm', contactFormSchema);




export default ContactForm;