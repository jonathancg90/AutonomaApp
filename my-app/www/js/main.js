$(window).load(function() {
    $(document).bind('deviceready', function () {
         var domain = 'http://redau.herokuapp.com/';

        //Elementos disparadoresd e evento
        var login = $('#logIn');

        function evtLogin(){
            var data = {
                'username':$('#username').val(),
                'password':$('#password').val()
            };
            var url =  domain +'login-ajax';
            $.ajax({
                dataType: "json",
                type: "POST",
                data: data,
                url: url,
                success: function(data){
                    if(data.status==false){
                        app.showAlert('Usuario no registrado','Login');
                    }
                    else{
                        window.location.replace("inicio.html");
                    }
                }
            });

        }
        //Eventos
        login.on('click',function(e){
            e.preventDefault();
            evtLogin();
        });
    });
});