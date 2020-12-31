const express = require('express');
const router = express.Router();
const bcryptController = require('../controllers/bcryptController.js');


//post request to create a user, hashes the password, then stores in users
router.post('/register_user', bcryptController.hashPassword, bcryptController.createUser, (req, res) => {
  return res.status(200).json(true);
});

//endpoint for comparing bcrypt password with input password
router.post('/check_pw', bcryptController.checkPassword,  (req, res) => {
  return res.status(200).send(res.locals.result);
});

module.exports = router; 