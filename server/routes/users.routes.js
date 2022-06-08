const express = require('express');
const router = express.Router();

const users = require('../controller/user.controller');

router.get('/', users.getUsers);            // Obtener todos los usuarios
router.post('/', users.createUser);         // Agregar un usuario
router.delete('/:id', users.deleteUser);    // Eliminar un usuario
router.put('/:id', users.updateUser);       // Actualizar un usuario
router.get('/:id', users.getUser);         // Obtener un usuario

module.exports = router;