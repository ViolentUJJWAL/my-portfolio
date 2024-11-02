const express = require('express');
const router = express.Router();
const {getAllProjects, addProject, updateProject, deleteProject} = require('../controllers/projectControllers');
const jwtToken = require('../middleware/jwtToken'); // Authentication middleware
const upload = require('../middleware/multer'); // Middleware to handle file uploads

// Apply authentication middleware to all routes
router.use(jwtToken);


router.get('/', getAllProjects);
router.post('/', upload.single('image'), addProject);
router.put('/:id', upload.single('image'), updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
