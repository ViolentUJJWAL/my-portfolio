const express = require('express');
const router = express.Router();
const {getAllSkills, addSkill, updateSkill, deleteSkill} = require('../controllers/skillControllers');
const jwtToken = require('../middleware/jwtToken'); // Authentication middleware
const upload = require('../middleware/multer'); // Middleware to handle file uploads

// Apply authentication middleware to all routes
router.use(jwtToken);


router.get('/', getAllSkills);
router.post('/', upload.single('icon'), addSkill);
router.put('/:id', upload.single('icon'), updateSkill);
router.delete('/:id', deleteSkill);

module.exports = router;
