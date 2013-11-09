$(window).load(function() {
    init();
});

function init(){
    var domain = 'http://redau.herokuapp.com/';
    var token = window.localStorage.getItem("token");
    if(token != null) {
        evtCarreras();
        evtTurnos();
        evtProfile();
        evtSaberCursoDelDia();
        evtCriterios();
    } else {
        alert('Ha ocurrido un error:deslogearse y vuelva a entrar')
    }


    //Elementos disparadoresd e evento
    var carreras = $('#Carreras'),
        turno = $('#Turnos'),
        actualizar = $('#form_actualizar'),
        calificar = $('#form_calificar');

    debugger;
    //Elementos contenedores
    var contentLogin = $('.content-logIn'),
        contentProfile = $('.content-Profile'),
        contentactualizar = $('.content-Cursos'),
        contentSaber = $('.info');

    //Eventos

    turno.on('click',function(e){
        e.preventDefault();
        evtTurnos();
    });

    carreras.on('click',function(e){
        e.preventDefault();
        evtCarreras();
    });
    actualizar.on('submit',function(e){
        e.preventDefault();
        evtActualizarProfile();
        evtSaberCursoDelDia();
    });

    calificar.on('submit',function(e){
        e.preventDefault();
        evtCalificar();
    });

    function evtProfile(){
        var data = {
            token:token
        };
        var url =  domain +'perfil';
        $.ajax({
            dataType: "json",
            type: "POST",
            data:data,
            url: url,

            success: function(data){
                //Agregar por defecto la carrera
                $.each($('#carrera'), function(i, value){

                });
                //Agregar por defecto ciclo
                $.each($('#select_ciclo'), function(i, value){

                });
                //agregar por defecto turno
                $.each($('.input_check_turno'), function(i, value){

                });
                //Agregar por defecto seccion
                $.each($('.input_check_turno'), function(i, value){

                });
            }
        });
    }
    function evtTurnos(){
        var url =  domain +'turno';
        var html ='';
        var turnos = $('#turnos');
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: function(data){
                var a = [
                    {'id':3, 'nombre':'Mañana'},
                    {'id':4, 'nombre':'Tarde'},
                    {'id':5, 'nombre':'Noche'}
                ];
                for(var i in data){
                    debugger;
                    html += '<input type="radio" name="radio-choice-b" class="input_check_turno" id="'+a[i].id+'" value="list" checked="checked"><label for="'+a[i].id+'">'+a[i].nombre+'</label>';
                }
                turnos.append(html);
                turnos.trigger('create');
            } 
        });
    }
    function evtCriterios(){
        var url =  domain +'criterios';
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: function(data){
                var contentCalificar = $('#form_calificar');
                contentCalificar.html('');
                $.each(data, function(id, value) {
                    contentCalificar.append('<label for="slider-1">'+value.nombre+'</label><input data-criterio="'+value.id+'" type="range" name="slider-1" id="slider-1" class="slide" value="50" min="0" max="100" data-highlight="true">');
                });
                contentCalificar.append('<input type="submit" value="Actualizar">');
                contentCalificar.trigger('create');
            }
        });
    }
    function evtCarreras(){
        var url =  domain +'carrera';
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: function(data){
                var contentCarreras = $('#carrera');
                $.each(data, function(id, value){
                    contentCarreras.append('<option value='+value.id+'>'+value.nombre+'</option>');
                });
                //contentCarreras.trigger('create');
            }
        });
    }
    function evtActualizarProfile(){
        var data = {
                'carrera':$("#select_carreras").val(),
                'turno':$("#input_check_turno:checked").val(),
                'ciclo':$('#select_ciclo').val(),
                'token':token
            };
        var url =  domain +'actualizar';
        $.ajax({
            dataType: "json",
            type: "POST",
            url: url,
            data:data,
            success: function(data){
                alert('actualizado');
                console.log(data.status);
            }
        });
    }
    function evtSaberCursoDelDia(){
         var data = {
                 'token':token
             };
         var url =  domain +'curso';
         $.ajax({
             dataType: "json",
             type: "POST",
             url: url,
             data:data,
             success: function(data){
                 var id_curso = data.id,
                     profesor = data.profesor,
                     curso = data.curso;
                 contentSaber.children('ul').html('');
                 contentSaber.children('ul').append('<li>Profesor: ID:'+profesor+' | Curso: '+curso+'</li>');
                 $('#idCurso').val(id_curso);
             }
         });
    }
    function evtCalificar(){
        var curso = $('#idCurso').val();

        var inputs = $('#form_calificar input[type=range]'),
            calificaciones = [];
        $.each(inputs, function(key, value){
            calificaciones.push({
                'id':$(value).data('id'),
                'valor':$(value).val()
            });
        });
        var data = {
                'token':token,
                'curso':curso,
                'califica':JSON.stringify(calificaciones)
            };
        var url =  domain +'califica';
        $.ajax({
            dataType: "json",
            type: "POST",
            url: url,
            data:data,
            success: function(data){
                debugger;
            }
        });
    }

//      var myDataRef = new Firebase('https://writeandshare.firebaseio.com');
//      $('#messageInput').keypress(function (e) {
//          if (e.keyCode == 13) {
//              var name = $('#nameInput').val();
//              var text = $('#messageInput').val();
//              myDataRef.push({name: name, text: text});
//              $('#messageInput').val('');
//          }
//      });
//      myDataRef.on('child_added', function(snapshot) {
//          var message = snapshot.val();
//          displayChatMessage(message.name, message.text);
//      });
//      function displayChatMessage(name, text) {
//          $('.comment:last-child').clone().appendTo('#list_comment');
//          var clone = $('.comment:last-child');
//          clone.find('.name_user').text(name);
//          clone.find('.body_comment').text(text);
//      }

}