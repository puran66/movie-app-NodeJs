const express = require('express');
const { userController } = require('../controller');
const upload = require('../middleware/multer');
const router = express.Router();

router.post('/sign-up', upload.single('profileImage'), userController.createUser);
router.post('/login', userController.authenticateUser)
router.get('/profile', userController.getProfile);

module.exports = router;