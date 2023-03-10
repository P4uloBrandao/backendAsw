const express = require('express');
const router = express.Router();
const userController = require('../controllers/userContoller');

// Rota para obter um usuário pelo ID
router.get('/:id', userController.getUserById);

// Rota para atualizar um usuário pelo ID
router.put('/:id', userController.updateUser);

// Rota para excluir um usuário pelo ID
router.delete('/:id', userController.deleteUser);

router.get('/', userController.getAllUsers);

module.exports = router;
