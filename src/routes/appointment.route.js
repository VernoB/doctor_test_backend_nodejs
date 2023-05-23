const express = require( 'express' );
const appointmentController = require( '../controller/appointment.controller' )
const { body } = require( 'express-validator' )

const router = express.Router();

router.post( '/create', appointmentController.createAppointment)

module.exports = router;