$(window).load(function() {
    $(document).bind('deviceready', function () {
        var domain = 'http://redau.herokuapp.com/';

        localStorage.myname = 'HOLA';
        app.showAlert(localStorage.myname ,'Login');
        var login = $('#logIn');

        login.on('click',function(e){
            e.preventDefault();
            evtLogin();
        });

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
                        localStorage.myname = data.token;
//                        $('#token').val(data.token);
                        window.location.replace("inicio.html");
                    }
                }
            });

        }

    });
});