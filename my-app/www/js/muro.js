$(function(){
	var $login = $('#login'),
		$chat = $('#chat');
		$submit_message = $('#submit-message');
		$messages = $('#messages');
		$wait = $('#wait');

	$chat.hide();
	var socket = io.connect('http://mighty-castle-2609.herokuapp.com/');
	socket.on('connect', function(){
		console.log('conected with socket!!');
		init();
	});

	var init = function(){
        //Ingreso por nickname
		$("#send-message").on('click', function(e){
            e.preventDefault();
            var message = $(this).val();
            socket.emit('message', 'jonathan', message);

		});
        //Actualiza mensajes que escriben
		socket.on('message', function(nickname, message){
			addMessage(nickname, message);
		});
        var addMessage =  function(nickname, message){
            $('#list-messages').append($("<li>@"+ nickname +": "+ message +"</li>"));
        }
	}

});