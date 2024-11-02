const express = require('express');
const router = express.Router();
const {getAllExperiences, addExperience, updateExperience, deleteExperience} = require('../controllers/experienceControllers');
const jwtToken = require('../middleware/jwtToken'); // Authentication middleware

// Apply authentication middleware to all routes
router.use(jwtToken);


router.get('/', getAllExperiences);
router.post('/', addExperience);
router.put('/:id', updateExperience);
router.delete('/:id', deleteExperience);

module.exports = router;
