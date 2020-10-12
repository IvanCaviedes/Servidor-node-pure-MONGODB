const mongoose = require('mongoose');

const TareasSchema = new mongoose.Schema({
    Nombre: {
        type: String,
        required: true
    },
    Descripcion: {
        type: String,
        required: true,
        unique: true
    }
});

const Tarea = mongoose.model('tareas',TareasSchema);

module.exports = Tarea;