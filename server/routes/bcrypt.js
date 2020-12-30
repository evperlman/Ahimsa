const express = require('express');
const router = express.Router();
const bcryptController = require('../controllers/bcryptController.js');

//endpoint creating a user
//post request to create_pw, hashes the password, then stores in bcrypt table
router.post('/create_pw', bcryptController.createPassword, bcryptController.storeUserCredentials, (req, res) => {
  return res.status(200).json(res.locals.result);
});

//endpoint for comparing bcrypt password with input password
router.post('/check_pw', bcryptController.checkPassword,  (req, res) => {
  return res.status(200).send(res.locals.result);
});

module.exports = router; 