const mongoose = require( 'mongoose' );

const { Schema } = mongoose;

const slotSchema = new Schema( {
    slot_time: {
        type: Date,
        required: [true, 'Slot must be provided'],
        unique: true
    }
} );

module.exports = mongoose.model( 'Slot', slotSchema );