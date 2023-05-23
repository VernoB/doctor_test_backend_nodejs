const mongoose = require( 'mongoose' );

const { Schema } = mongoose;

const doctorSchema = new Schema( {
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true
    },
    specification: {
        type: String,
        required: [true, 'specification is required'],
    },
    slots: [{
        type: Schema.Types.ObjectId,
        ref: 'slots',
    }]

}, { timestamps: true} );

module.exports = mongoose.model('Doctor', doctorSchema)