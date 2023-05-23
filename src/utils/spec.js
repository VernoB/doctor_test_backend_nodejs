
const specs = 'Tepareutic, Dermatology,gynaecology, Ophthalmology, Paediatrics ';

exports.spec = specs.split( ',' );


exports.checkForError = (error, req, res, next ) => 
{
    if ( error.code === 11000 )
        {
            res.status( 400 ).json( { error: 'User already exists' } ).send()
    }
    else
    {
        const err = new Error( )
        err.statusCode = 500
        err.message = error
        next( err )
    }
}
