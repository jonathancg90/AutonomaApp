var nombre;
var arrayNames = [];
var websocket = io.connect();

$(document).on("ready",iniciar);

function iniciar()
{
    //Formulario para enviar un nuevo mensaje
    $("#formMsg").on("submit",function(e){
            e.preventDefault();
            sendMessage();
    });
    websocket.on("nuevoMensaje",procesarMensaje);
}
//Enviar el mensaje
function sendMessage(){
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
    $('#chatInsite').append($('<p>').append($('<article>').html('<span>'+ data + "</span> ")));
    $('#chat').animate({scrollTop: $("#chatInsite").height()}, 300);
}