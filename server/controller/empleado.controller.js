const Empleados = require("../models/Empleados");

const empeladoController = {};

//listar todos los empleados
empeladoController.getEmpleados = async (req, resp) => {
    const empleados = await Empleados.find();
    resp.json(empleados);
};


//crear empleado
empeladoController.createEmpleado = async (req, resp) => {
    //req.body contiene los datos del empleado a guardar
    // console.log(req.body);
    // resp.json('Empleado recibido');
    const empleado = new Empleados({
        nombre: req.body.nombre,
        puesto: req.body.puesto,
        departamento: req.body.departamento,
        salario: req.body.salario
    });
    await empleado.save();
    resp.json({
        'status': 'Empleado Guardado Correctamente'
    });
};

//actualizar empleado
empeladoController.updateEmpleado = async (req, resp) => {
    const { id } = req.params;
    const empleado = {
        nombre: req.body.nombre,
        puesto: req.body.puesto,
        departamento: req.body.departamento,
        salario: req.body.salario
    }
    await Empleados.findByIdAndUpdate(id, {$set: empleado}, {$new: true});
    resp.json({status: 'Empelado actualizado correctamente'});
};

//obtener empleado
empeladoController.getEmpleado = async (req, resp) => {
    // console.log(req.params);
    // resp.json("Recibido");
    const empleado = await Empleados.findById(req.params.id);
    resp.json(empleado);
};

//eliminar un empelado
empeladoController.deleteEmpleado = async (req, resp) => {
    const { id } = req.params;
    await Empleados.findByIdAndDelete(id);
    resp.json({status: 'Empleado eliminado correctamente'});
};

module.exports = empeladoController;

