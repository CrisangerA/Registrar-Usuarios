const express = require('express');
const router = express.Router();
const Users = require('../models/users');

router.get('/', async (req, res) => {
    const users = await Users.find();
    res.json(users);
});

router.post('/', async (req, res) =>{
    const { Nombre, Direccion, Telefono, Email, Ciudad, Intereses } = req.body;
    const newUser = new Users({Nombre, Direccion, Telefono, Email, Ciudad, Intereses});
    await newUser.save();
    res.json("Received")
});

router.put('/:id', async (req, res) => {
    const { Nombre, Direccion, Telefono, Email, Ciudad, Intereses } = req.body;
    const newUser = { Nombre, Direccion, Telefono, Email, Ciudad, Intereses }
    await Users.findByIdAndUpdate(req.params.id, newUser);
    res.json("Edited");
});

router.delete('/:id', async (req, res) =>{
    await Users.findByIdAndDelete(req.params.id);
    res.json("Deleted");
});

router.get('/:id', async (req, res) => {
    const user = await Users.findById(req.params.id);
    res.json(user);
});

module.exports = router;