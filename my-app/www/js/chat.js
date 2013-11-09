var nombre;
var arrayNames = [];

$(document).on("ready",iniciar);

function iniciar(){
    //Formulario para enviar un nuevo mensaje
    $("#formMsg").on("submit",function(e){
            e.preventDefault();
            sendMessage();
    });
    $('#sendMessage').on('click', function(){
        e.preventDefault();
        sendMessage();
    });
    debugger;
    var websocket = io.connect('http://localhost:3001/socket.io/socket.io.js');
    var socket = io.connect('http://localhost:3001/socket.io/socket.io.js');
    socket.on('connect', function () {
      // socket connected
      alert('conected');
    });
    socket.on('custom event', function () {
      alert('conected2');
    });
    socket.on('disconnect', function () {
      // socket disconnected
    });
    socket.send('hi there');
    websocket.on("loadFile", load);
    websocket.on("nuevoMensaje",procesarMensaje);
}
function load(data){
    alert(6);
}
//Enviar el mensaje
function sendMessage(){
    debugger;
    var msg = $("#msg").val();
    //Verificamos que no tenga scripts
    if((msg.indexOf("<") != -1)){
            alert("Mensaje incorrecto");
    }
    else if((msg.indexOf(">") != -1)){
            alert("Mensaje incorrecto");        
    }
    else if((msg.indexOf(";") != -1)){
            alert("Mensaje incorrecto");
    }
    else{
        //Limpiamos la caja del formulario                
        $("#msg").val("");
        //Enviamos un mensaje
        localStorage.message = msg;
        websocket.emit("enviarMensaje",msg);        
    }   
}
function procesarMensaje(data){
    debugger;
    $('#list_comment').append($('<p>').append($('<article>').html('<span>'+ data + "</span> ")));
}