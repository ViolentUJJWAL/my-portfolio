const express = require('express');
const router = express.Router();
const { getAllContactUs, ceateContectUs, deleteContactUs } = require('../controllers/contectUsControllers');
const jwtToken = require('../middleware/jwtToken');


router.post('/', ceateContectUs);
router.get('/', jwtToken ,getAllContactUs);
router.delete('/:id', jwtToken ,deleteContactUs);


module.exports = router;
