const { checkForError } = require('../utils/spec')
const Slots = require( '../models/slots.model' );

exports.create = async ( req, res, next ) =>
{
    const { slot_time } = req.body; 
    
    if (!slot_time) next(new Error('Slot time is required'))
    const dateParse = Number.isNaN(Date.parse(slot_time)) ? next(new Error('Slot time need to be a date')) : Date.parse(slot_time)
    const nDate = new Date( dateParse )

    const current_date = new Date()

    //check the date now.
    if (dateParse < current_date) next(new Error('The date need to be after now'))
    try
    {
     const slots = new Slots( { slot_time: dateParse} ) 
     await slots.save().then( data => res.status(201).json( { data } ) )
    } catch (error) {
        checkForError(error, req, res, next)
    }
};

exports.fetchAll = async ( req, res, next ) =>
{
    await Slots.find({},  '_id slot_time').then( doc => res.status(200).json({slots: doc}))
}