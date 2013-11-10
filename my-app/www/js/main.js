$(window).load(function() {
    init();
});

function init(){
    //var domain = 'http://redau.herokuapp.com/';
    var domain = 'http://127.0.0.1:5000/';

    var token = window.localStorage.getItem("token");
    if(token != null) {
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
//    $('#a').on('click', function(e){
//        e.preventDefault();
//    });
    turno.on('click',function(e){
        e.preventDefault();
        evtTurnos();
    });

    carreras.on('click',function(e){
        e.preventDefault();
        evtCarreras();
    });
    actualizar.on('click',function(e){
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
                evtCarreras(data.carrera);
                //Agregar por defecto ciclo
                evtCiclos(data.ciclo);
                //Agregar Turno por defecto ciclo
                evtTurnos(data.turno);
                //Agregar seccion por defecto
                evtSeccion(data.seccion)
            }
        });
    }
    function evtSeccion(id){
        var seccion =  [ {'id':'A'}, {'id':'B'}
                      ];
        var html ='<label for="slider2" class="ui-slider">Seccion:</label><select name="slider2" id="slider2" data-role="slider">';
        $.each(seccion, function(key, value){
            if(id == value.id){
                html += '<option value="on">'+value.id+'</option>';
            }
        });
        $.each(seccion, function(key, value){
            if(id != value.id){
                html += '<option value="off">'+value.id+'</option>';
            }
        });
        html +='</select>';
        $('#form-seccion').append(html);
        $('#form-seccion').trigger('create');
    }
    function evtCiclos(id){
        var ciclos =  [ {'id':1, 'nombre':'I'}, {'id':2, 'nombre':'II'},{'id':3, 'nombre':'III'},
                        {'id':4, 'nombre':'IV'},{'id':5, 'nombre':'V'},{'id':6, 'nombre':'VI'},
                        {'id':7, 'nombre':'VII'},{'id':8, 'nombre':'VIII'},{'id':9, 'nombre':'IX'},{'id':1, 'nombre':'X'}
                      ];
        var html ='<label for="select_ciclo">Ciclo:</label><select name="select_ciclo" id="select_ciclo">';
        $.each(ciclos, function(key, value){
            if(id == value.id){
                html += '<option value="'+value.id+'">'+value.nombre+'</option>';
            }
        });
        $.each(ciclos, function(key, value){
            if(id != value.id){
                html += '<option value="'+value.id+'">'+value.nombre+'</option>';
            }
        });
        html +='</select>';
        $('#form-ciclo').append(html);
        $('#form-ciclo').trigger('create');

    }

    function evtTurnos(turno){
        var url =  domain +'turno';
        var html ='<fieldset data-role="controlgroup" data-type="horizontal" data-role="fieldcontain" name="select-turno"><legend>Turnos:</legend>';
        var turnos = $('#form-turnos');
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: function(data){
                $.each(data, function(key, value){
                    if(turno.id == value.id){
                        html += '<input type="radio" name="radio-choice-b" class="input_check_turno" data-id="'+value.id+'" id="'+value.id+'" value="list" checked="checked"><label for="'+value.id+'">'+value.nombre+'</label>';
                    }
                });
                $.each(data, function(key, value){
                    if(turno.id != value.id){
                        html += '<input type="radio" name="radio-choice-b" class="input_check_turno" data-id="'+value.id+'" id="'+value.id+'" value="list"><label for="'+value.id+'">'+value.nombre+'</label>';
                    }
                });
                html +='</fieldset>';
                turnos.append(html);
                turnos.trigger('create');
            } 
        });
    }
    function evtCriterios(){
        var url =  domain +'criterios';
        var html ='<form action="" id="form_calificar">';
        var contentCalificar = $('#form_calificar');
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: function(data){
                for(var i in data){
                    html += '<label for="slider-'+data[i].id+'">'+data[i].nombre+'</label><input data-criterio="'+data[i].id+'" type="range" name="slider-1" id="slider-'+data[i].id+'" class="slide" value="50" min="0" max="100" data-highlight="true">'
                }
                html+='<input type="submit" value="Actualizar"></form>';
                contentCalificar.append(html);
                contentCalificar.trigger('create');
            }
        });
    }
    function evtCarreras( carrera){
        var url =  domain +'carrera';
        var html ='<label for="carrera">Carrera:</label><select name="carrera" id="carrera">';
        $.ajax({
            dataType: "json",
            type: "GET",
            url: url,
            success: function(data){
                var contentCarreras = $('#carrera');
                for(var i in data){
                    if(carrera.id == data[i].id){
                       html += '<option value='+data[i].id+'>'+data[i].nombre+'</option>';
                    }
                }
                for(var i in data){
                    if(carrera.id != data[i].id){
                       html += '<option value='+data[i].id+'>'+data[i].nombre+'</option>';
                    }
                }
                html +='</select>';
                $('#form-carrera').append(html);
                $('#form-carrera').trigger('create');
            }
        });
    }
    function evtActualizarProfile(){
        var data = {
                'nombre':$('#act-name').val(),
                'carrera':$("#carrera option:selected").val(),
                'turno':$(".input_check_turno:checked").data('id'),
                'ciclo':$('#select_ciclo option:selected').val(),
                'seccion':$('#slider2 option:selected').text(),
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