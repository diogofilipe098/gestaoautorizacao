#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
const Emprestimo = require('../Model/emprestimo.js');

const gestorEmprestimos_queue = "GestorEmprestimosCommand_Queue";

const exchange = "GestorEmprestimosQuery_exchange";

module.exports = {
  sendFanout : function(emprestimo, eventType) {
    amqp.connect('amqp://localhost', function(error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }

     var msg = JSON.stringify(emprestimo);
     // Acrescenta o eventType ao JSON enviado por mensagem
     msg = msg.substring(0, msg.length-1) + ",\"eventType\":\"" + eventType + "\"}";

        channel.assertExchange(exchange, 'fanout', {
          durable: true
        });

        channel.bindQueue(gestorEmprestimos_queue, exchange, '');
        
        channel.publish(exchange, '', Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
      });
      setTimeout(function() {
        connection.close();
      }, 500);
    });
  }
}
