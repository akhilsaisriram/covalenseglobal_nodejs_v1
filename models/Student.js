const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String, // Storing the base64 string of the image
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  studentClass: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
studentSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password; // Remove the password from the returned object
    return ret;
  },
});
module.exports = mongoose.model("Student", studentSchema);
