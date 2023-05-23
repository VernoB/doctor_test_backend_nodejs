const express = require("express")
const { query, body } = require("express-validator");

const userController = require( "../controller/users.controller" );
const router = express.Router();
// const isAuth = require("../middleware/isAuth.middleware");

//Create a new user on the database
router.post( 
  "/signup",
  [
    body("name")
      .notEmpty()      
      .withMessage("Name is required"),
    body("phone")
      .notEmpty()
      .withMessage("Please enter a valid password")
      .trim()
  ],
  userController.signup
);

router.get('/all', userController.getAll)


module.exports = router;