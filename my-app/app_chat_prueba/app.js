
/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
// var user = require('./routes/user');
var http = require('http');
var path = require('path');
var rutas = require('App/Rutas');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);
// app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//websockets
var io = require('socket.io').listen(server);
//clientes
//JSON para controlar que no se repitan nombres
var usuariosConectados = {};
io.sockets.on('connection',function(socket){
	//Recibimos un nuevo mensaje y lo mandamos a todas las sockets
	socket.on('enviarMensaje', function(mensaje){
		var data = mensaje;
		io.sockets.emit('nuevoMensaje', data);
	});
});
rutas(app);







