const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer'); // Middleware to handle file uploads
const { updateUser, getUser, getUserProfile, resetPassword, uploadfile, addLink, deleteLink } = require('../controllers/userControllers');
const jwtToken = require('../middleware/jwtToken'); // Authentication middleware


router.get('/', jwtToken, getUser);
router.put('/', jwtToken, updateUser);
router.put('/uploadResume', jwtToken,
    upload.single("resume"),
    async (req, res, next) => {
        req.name_file = "resume"
        next()
    }, uploadfile);
router.put('/uploadProfilrImage', jwtToken,
    upload.single("profilrImage"),
    async (req, res, next) => {
        req.name_file = "profilrImage"
        next()
    }, uploadfile);
router.put('/uploadLogo', jwtToken,
    upload.single("logo"),
    async (req, res, next) => {
        req.name_file = "logo"
        next()
    }, uploadfile);
router.put('/', jwtToken, updateUser);
router.put('/resetPassword', jwtToken, resetPassword);
router.put('/addLink', jwtToken, addLink);
router.delete('/deleteLink/:id', jwtToken, deleteLink);
router.get('/:username', getUserProfile);


module.exports = router;
