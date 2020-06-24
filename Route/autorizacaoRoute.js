module.exports = (app) => {
    const auth = require('../Controller/autorizacaoController.js');

    // Create a new emprestimo
    app.post('/autorizacoes', auth.create);

}
