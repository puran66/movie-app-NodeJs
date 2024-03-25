const express = require('express');
const { userController } = require('../controller');
const upload = require('../middleware/multer');
const { authenticate, checkAuth } = require('../middleware/auth');
const router = express.Router();

router.post('/sign-up', upload.single('profileImage'), userController.createUser);
router.post('/login', userController.authenticateUser)
router.get('/all-users', authenticate, checkAuth(["ADMIN"]), userController.getUsers)
router.delete('/user-delete/:id', authenticate, checkAuth(['ADMIN']), userController.deleteUser)
router.post('/change-password/:id',authenticate,userController.changePassword)
router.post('/user-update/:id', upload.single('profileImage'), authenticate, checkAuth(["ADMIN", "USER"]), userController.updateUser)
router.get('/profile', authenticate, checkAuth(["ADMIN", "USER"]), userController.getProfile);

module.exports = router;