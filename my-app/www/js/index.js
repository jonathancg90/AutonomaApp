
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        //Eventos ya una vez cargada la aplicacion
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        debugger;
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        app.appEvent();
        app.showAlert('Mensaje de prueba','Mensaje informativo');

    },
    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },
//    initialize: function() {
//        var self = this;
//        this.store = new MemoryStore(function() {
//            self.showAlert('Store Initialized', 'Info');
//        });
//        $('.search-key').on('keyup', $.proxy(this.findByName, this));
//    },


    appEvent: function(){
         var domain = 'http://redau.herokuapp.com/';

        //Elementos disparadoresd e evento
        var login = $('#logIn');

        function evtLogin(){
            debugger;
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
                        $('.message').append(data.message);
                    }
                    else{
                        alert('Usuario logeado')
//                        $('.message').append(data.message);
//                        $('#token').val(data.token);
//                        $('.Information').show();
//                        evtProfile();
//                        evtSaberCursoDelDia();
//                        evtCriterios();
                    }
                }
            });

            //Eventos
            login.live('click',function(e){
                debugger;
                e.preventDefault();
                evtLogin();
            });
        }

    }
};
