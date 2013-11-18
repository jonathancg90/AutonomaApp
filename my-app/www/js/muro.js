$(function(){
	var $login = $('#login'),
		$chat = $('#chat');
		$submit_message = $('#submit-message');
		$messages = $('#messages');
		$wait = $('#wait');

	$chat.hide();
	//var socket = io.connect('http://auserver.herokuapp.com/');
    var socket = io.connect('http://127.0.0.1:5050/');

	socket.on('connect', function(){
		console.log('conected with socket!!');
		init();
	});

	var init = function() {
        //Ingreso por nickname
		$("#send-message").on('click', function(e){
            e.preventDefault();
            var idCurso = window.localStorage.getItem("idCurso"),
            	message = $('#messageInput').val(),
            	name = $('#act-name').val();
            socket.emit('message', idCurso, name, message);

		});
        //Actualiza mensajes que escriben
		socket.on('message', function(nickname, messages){
			addMessage(nickname, messages);
		});
        var addMessage =  function(nickname, messages){
        	debugger;
        	$('#list-messages').html('');
        	$.each(messages, function(i, value){
        		$('#list-messages').append($("<li>@"+ value.name +": "+ value.comentario +"</li>"));
        	})
        }
	}

});