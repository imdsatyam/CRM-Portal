const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticateUser');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { getSidebarTitles } = require('../controllers/sidebarController');

// User Routes
router.post('/users/signup', authController.upsertSignup);
router.post('/users/login', authController.loginUser);
router.get('/users/userinfo', authenticateUser, userController.getUserInfo);
router.get('/users', userController.getAllUsersInfo);
router.delete('/users/:id', authenticateUser, userController.deleteUser);
router.get('/sidebar-titles', getSidebarTitles);
router.post('/users/create', userController.createUser);

module.exports = router;
