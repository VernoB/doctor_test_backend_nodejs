const express = require( 'express' );

const router = express.Router();
const slotController = require( '../controller/slots.controller' )

router.post( '/create', slotController.create )
router.get( '/fetch', slotController.fetchAll )

module.exports = router;