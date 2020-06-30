const Emprestimo = require('../Model/emprestimo.js');
const Send = require('../MessageBroker/sender.js');
const Service = require('../Service/autorizacaoService.js');
const http = require('request');

// cria e guarda um novo emprestimo
exports.create = (req, res) => {
    // request valido
    if(!req.body.inicio || !req.body.fim || !req.body.nomeUser || !req.body.tituloObra) {
        return res.status(400).send({
            message: "Emprestimo invalido"
        });
    }

    // Create a Emprestimo
    const emprestimo = new Emprestimo({
        _id: req.body._id,
        inicio: req.body.inicio,
        fim: req.body.fim,
        nomeUser: req.body.nomeUser,
        tituloObra: req.body.tituloObra,
        condicao: req.body.condicao
    });

    var nome = emprestimo.nomeUser;
    http('https://gestaoutilizadores.herokuapp.com/users/' + nome,function (error, response, body) {
       if(error){
           return res.status(400).send({
            message: "Emprestimo invalido"
        });
       } else {
           var rep = JSON.parse(body)

           if(rep.Reputacao > emprestimo.condicao){
            Service.createEmprestimo(emprestimo, 'HAS_AUTHORIZATION_EMPRESTIMO');
            return res.status(200).send({
                message: emprestimo
            });
           } else {
            Service.createEmprestimo(emprestimo, 'ERROR_AUTHORIZATION_EMPRESTIMO');
            return res.status(200).send({
                message: emprestimo
            });
           }
       }
    });
}
