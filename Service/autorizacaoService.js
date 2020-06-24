const Emprestimo = require('../Model/emprestimo.js');
const Send = require('../MessageBroker/sender.js');

module.exports = {

  createEmprestimo : function(emprestimo, msg) {
      console.log(msg)
    emprestimo.save()
    .then(data => {
        if(msg == 'ERROR_AUTHORIZATION_EMPRESTIMO')
            Send.sendFanout(data, 'ERROR_AUTHORIZATION_EMPRESTIMO'); // to GE_Command
        else
            Send.sendFanout(data, 'HAS_AUTHORIZATION_EMPRESTIMO');
    }).catch(err => {
        console.log("Erro ao guardar emprestimo na DB!");
    });
  }
}