const User = require('../models/user.model')
const { checkForError } = require('../utils/spec')

//signup the users
exports.signup = async ( req, res, next ) =>
{
    const { name, phone } = req.body;
        if (!name || !phone) return res.status(400).send('Invalid parameter')    
        try {
            const user = new User( { name, phone } )
            await user.save().then( data =>
            {
                return res.status(201).json( { data } );
            } ) 
        } catch (error) {
            checkForError( error, req, res, next )
        }
    
};

exports.getAll = async ( req, res, next ) =>
{
       await User.find({},  '_id').then( doc => res.status(200).json({users: doc}))

}