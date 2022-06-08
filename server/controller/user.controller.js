// const bcrypt = require('bcryptjs/dist/bcrypt');
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const usersController = {}

//Lista todos los usuarios
usersController.getUsers = async (req, res) => {
    const users = await Users.find();
    res.json(users);
}

//Crear un usuario
usersController.createUser = async (req, res) => {
    // console.log("hola");
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const tipo = req.body.tipo;
    const User = new Users({
        name: name,
        email: email,
        password: password,
        tipo: tipo
    });
    console.log(User);
    User.password = bcrypt.hashSync(password, 10);
    await User.save()
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            return res.json({ message: 'Error user exists' });
        })
} // Fin createUser

usersController.deleteUser = async (req, res) => {
    await Users.findByIdAndRemove(req.params.id)
        .then((user) => {
            res.json({ status: 'Usuario eliminado', user: user });
        })
        .catch((err) => {
            console.log(err);
            return res.json({ message: 'Error al eliminar el usuario' });
        })
} // Fin de deleteUser

usersController.updateUser = async (req, res) => {
    const {id} = req.params;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const tipo = req.body.tipo;

    const user = new Users({
        name: name,
        email: email,
        password: password,
        tipo: tipo
    });

    user._id = id;
    user.password = bcrypt.hashSync(password, 10);
    await Users.findByIdAndUpdate(id, {$set: user}, {new: true})
    .then((user)=>{
        res.json({status: 'Usuario actualizado', user:user});
    })
    .catch((err)=>{
        console.log(err);
        return res.json({message: 'Error al actualizar el usuario'});
    });
} // Fin de updateUser

usersController.getUser = async (req, res) =>{
    const user = await Users.findById(req.params.id)
    .then((user)=>{
        res.json(user);
    })
    .catch((err)=>{
        console.log(err);
        return res.json({message: 'Error al obtener usuario'})
    })
} // Fin de getUser

module.exports = usersController;