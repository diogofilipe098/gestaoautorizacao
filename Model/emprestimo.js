const mongoose = require('mongoose');

const EmprestimoSchema= mongoose.Schema({
    _id: String,
    inicio: Date,
    fim: Date,
    nomeUser: String,
    tituloObra: String,
    condicao: Number
});

module.exports = mongoose.model('Emprestimo', EmprestimoSchema);
