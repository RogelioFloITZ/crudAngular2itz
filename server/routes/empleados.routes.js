const express = require('express');
const router = express.Router();

//importamos las funciones del controlador
const empleados = require('../controller/empleado.controller');

//crear un empleado
router.post('/', empleados.createEmpleado);

// CRUD
router.get('/', empleados.getEmpleados); //cuando el usuario pida /api/empleados se ejecuta la funcion get empleados del controlador http://localhost:3000/api/empleados

//obtener un empleado
router.get('/:id', empleados.getEmpleado);

//actualizar un empleado
router.put('/:id', empleados.updateEmpleado);

//eliminar un empleado
router.delete('/:id', empleados.deleteEmpleado);

module.exports = router;
