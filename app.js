var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Gestor de Autorizações app"});
});


require('./Route/autorizacaoRoute.js')(app);

let port = 3003;
app.listen(process.env.PORT || port)



const db ='mongodb://admin:admin123@ds363118.mlab.com:63118/autorizacoesdb'


mongoose
    .connect(db, { 
        useNewUrlParser: true
      })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
