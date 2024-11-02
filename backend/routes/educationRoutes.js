const express = require('express');
const router = express.Router();
const {getAllEducation, addEducation, updateEducation, deleteEducation} = require('../controllers/educationControllers');
const upload = require('../middleware/multer'); // Middleware to handle file uploads
const jwtToken = require('../middleware/jwtToken'); // Authentication middleware

// Apply authentication middleware to all routes
router.use(jwtToken);


router.get('/', getAllEducation);
router.post('/', upload.single('image'), addEducation);
router.put('/:id', upload.single('image'), updateEducation);
router.delete('/:id', deleteEducation);


module.exports = router;
