// routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/userContoller')

// Users
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.post('/users', adminController.createUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);
router.get('/users/search', adminController.searchUsers);



module.exports = router;
