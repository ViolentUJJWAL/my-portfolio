const express = require('express');
const router = express.Router();
const {blockUser, getAlluser} = require('../controllers/adminControllers');
const jwtToken = require('../middleware/jwtToken'); // Authentication middleware
const checkAdmin = require("../middleware/checkAdmin")

// Apply authentication middleware to all routes
router.use(jwtToken);
router.use(checkAdmin());

router.put('/block/:id', blockUser);
router.get('/users', getAlluser);


module.exports = router;
