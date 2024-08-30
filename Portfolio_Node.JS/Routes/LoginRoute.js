const express = require('express');
const router = express.Router();
const {loginUser }= require('../Controllers/LoginController');
// Login route
router.post('/', loginUser );

module.exports = router;
