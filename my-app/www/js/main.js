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
    var carreras = $('#carrera'),
        turno = $('#Turnos'),
        actualizar = $('#form_actualizar'),
        calificar = $('#form_calificar');

    //Elementos contenedores
    var contentLogin = $('.content-logIn'),
        contentProfile = $('.content-Profile'),
        contentactualizar = $('.content-Cursos'),
        contentSaber = $('.info');

    //Eventos
    $('#a').on('click', function(e){
        e.preventDefault();
    });
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
                $('#act-name').val(data.nombre);
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
        var html ='<legend>Turnos:</legend>';
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
                    html += '<input type="radio" name="radio-choice-b" class="input_check_turno" id="'+a[i].id+'" value="list" checked="checked"><label for="'+a[i].id+'">'+a[i].nombre+'</label>';
                }
                turnos.append(html);
                turnos.trigger('create');
            } 
        });
    }
    function evtCriterios(){
        var url =  domain +'criterios';
        var html ='';
        var contentCalificar = $('#form_calificar');
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: function(data){
                for(var i in data){
                    debugger;
                    html += '<label for="slider-'+data[i].id+'">'+data[i].nombre+'</label><input data-criterio="'+data[i].id+'" type="range" name="slider-1" id="slider-'+data[i].id+'" class="slide" value="50" min="0" max="100" data-highlight="true">'
                }
                html+='<input type="submit" value="Actualizar">';
                contentCalificar.append(html);
                contentCalificar.trigger('create');
            }
        });
    }
    function evtCarreras(){
        var url =  domain +'carrera';
        $('#carrera').html('');
        var html ='';
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: function(data){
                var contentCarreras = $('#carrera');
                for(var i in data){
                    html += '<option value='+data[i].id+'>'+data[i].nombre+'</option>';
                }
                contentCarreras.append(html);
                contentCarreras.trigger('create');
            }
        });
    }
    function evtActualizarProfile(){
        var data = {
                'nombre':$('#act-name').val(),
                'carrera':$("#select_carreras").val(),
                'turno':$("#input_check_turno:checked").val(),
                'ciclo':$('#select_ciclo').val(),
                'token':token
            };
        if(data.carrera != '' && data.turno != '' && data.ciclo != '') {
            var url =  domain +'actualizar';
            $.ajax({
                dataType: "json",
                type: "POST",
                url: url,
                data:data,
                success: function(data){
                    if(data.status == false){
                        alert('No se pudo actualizar tus datos');
                    } else {
                        alert('Datos actualizados')
                    }
                }
            });
        } else {
           alert('datos incompletos')
        }
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