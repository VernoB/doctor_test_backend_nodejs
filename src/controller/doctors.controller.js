const { checkForError } = require( '../utils/spec' ) 
const Doctor = require( '../models/doctor.model' )

const { spec } = require( '../utils/spec' )

exports.create = async ( req, res, next ) =>
{
    console.log('Creating doctor')
    const { name, specification, slots, email } = req.body;

    if ( !name || !specification || slots.length === 0 ) return res.status( 404 ).json( { message: ' Name, slots or specification is required' } )
    
    try
    {
        const existingSlots = await Doctor.find({ slots: { $in: slots } });
         // check if the slots already exits in the database.
        
        if (existingSlots.length > 0) {
            return res.status(400).json({ message: 'One or more slots already exist in the system' });
        }
        
        const doctor = new Doctor({ name, specification, email });

        doctor.slots = slots;
        
        await doctor.save();

            // Construct the projection to include only the desired fields
        // const projection = {
        // _id: 1,
        // name: 1,
        // specification: 1,
        // slots: 1
        // };

        // const createdDoctor = await Doctor.findById(doctor._id).select(projection);

        
        return res.status(201).json({ data: doctor });
        
    } catch (error) {
        checkForError(error, req, res, next)
    }
};

exports.fetchAll = async ( req, res, next ) =>
{
    await Doctor.find({},  '_id').then( doc => res.status(200).json({doctor: doc}))
}
