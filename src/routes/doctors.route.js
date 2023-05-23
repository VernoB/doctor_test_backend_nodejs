const express = require( 'express' );
const doctorController = require( '../controller/doctors.controller' )
const { body } = require( 'express-validator' )

const router = express.Router();

router.post( '/create', doctorController.create)

router.get( '/all', doctorController.fetchAll )

module.exports = router;