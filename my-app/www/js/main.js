//$(window).load(function() {
//    $(document).bind('deviceready', function () {
//        $('#logIn').on('click',function(e){
//            e.preventDefault();
//            alert('entro');
//        });
//    });
//});

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
                    debugger;
                    if(data.status==false){
                        $('.message').append(data.message);
                    }
                    else{
                        alert('Usuario logeado');
//                        $('.message').append(data.message);
//                        $('#token').val(data.token);
//                        $('.Information').show();
//                        evtProfile();
//                        evtSaberCursoDelDia();
//                        evtCriterios();
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