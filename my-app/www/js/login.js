$(window).load(function() {
    $(document).bind('deviceready', function () {
        var domain = 'http://redau.herokuapp.com/';

        var login = $('#logIn');

        var token = window.localStorage.getItem("token");
        if(token != null) {
            evtLoginToken();
        }

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
                        window.localStorage.setItem("token", data.token);
                        window.location.replace("inicio.html");
                    }
                }
            });

        }
        function evtLoginToken(){
            var data = {
                'token':token
            };
            var url =  domain +'login-token';
            $.ajax({
                dataType: "json",
                type: "POST",
                data: data,
                url: url,
                success: function(data){
                    if(data.status!=false){
                        window.localStorage.setItem("token", data.token);
                        window.location.replace("inicio.html");
                    }
                }
            });

        }

    });
});