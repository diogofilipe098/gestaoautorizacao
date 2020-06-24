const mongoose = require('mongoose');

const EmprestimoSchema= mongoose.Schema({
    inicio: Date,
    fim: Date,
    nomeUser: String,
    tituloObra: String,
    condicao: Number
});

module.exports = mongoose.model('Emprestimo', EmprestimoSchema);
