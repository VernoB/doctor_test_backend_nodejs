const mongoose = require( 'mongoose' );

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    index: true,
    unique: true,
  },
  phone: {
    type: String,
    required: [true, 'phone is required'],
  }
} );

module.exports = mongoose.model("User", userSchema);