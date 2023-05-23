const mongoose = require( 'mongoose' );

const { Schema } = mongoose;

const appointmentSchema = new Schema( {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'doctors',
    },
    slot: {
        type: Schema.Types.ObjectId,
        ref: 'slots',
    },

}, { timestamps: true} );

module.exports = mongoose.model('Appointment', appointmentSchema)