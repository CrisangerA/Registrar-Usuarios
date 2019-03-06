const { Schema, model} = require('mongoose');

const UserSchema = new Schema({
    Nombre: { type: String, required: true },
    Direccion: { type: String, required: true },
    Telefono: { type: String, required: true },
    Email: { type: String, required: true},
    Ciudad: { type: String },
    Intereses: {type: String }
});

module.exports = model('User', UserSchema);