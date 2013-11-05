$(window).load(function() {
    $(document).bind('deviceready', function () {
         var domain = 'http://redau.herokuapp.com/';
        //window.localStorage.getItem("token");
        app.showAlert('prueba' ,'Token');
        $('#storage').html('prueba: '+window.localStorage.getItem("token"));
        //app.showAlert(window.localStorage.getItem("token") ,'Token');
        //app.showAlert(sessionStorage.getItem("token") ,'Token');
        //hola
        evtProfile();

        //Elementos disparadoresd e evento
        var carreras = $('#Carreras'),
            turno = $('#Turnos'),
            actualizar = $('#form_actualizar'),
            calificar = $('#form_calificar');


        //Elementos contenedores
        var contentLogin = $('.content-logIn'),
            contentProfile = $('.content-Profile'),
            contentCarreras = $('#select_carreras'),
            contentTurno = $('#turnos'),
            contentactualizar = $('.content-Cursos'),
            contentSaber = $('.content-Saber'),
            contentCalificar = $('#form_calificar');

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
        });

        calificar.on('submit',function(e){
            e.preventDefault();
            evtCalificar();
        });

        function evtProfile(){
            var id = $('#token').val();
            if(id != ''){
                var data = {
                    token:id
                };
                var url =  domain +'perfil';
                $.ajax({
                    dataType: "json",
                    type: "POST",
                    data:data,
                    url: url,

                    success: function(data){
                        $('act-name').val(data.username);
                        contentProfile.children('ul').html('');
                        contentProfile.children('ul').append('<li>Carrera: ID:'+data.carrera.id+' | Nombre: '+data.carrera.nombre+'</li>');
                        contentProfile.children('ul').append('<li>Ciclo: '+data.ciclo+'</li>');
                        contentProfile.children('ul').append('<li>Turno: ID:'+data.turno.id+' | Nombre: '+data.turno.nombre+'</li>');
                        contentProfile.children('ul').append('<li>'+data.username+'</li>');
                        contentProfile.children('ul').append('<li>Seccion '+data.seccion+'</li>');
                        //$.mobile.changePage("otherPage.html");
                    }
                });
            } else{
                contentProfile.children('ul').html('Usuario no valido');
            }
        }
        function evtTurnos(){
            var url =  domain +'turno';
            $.ajax({
                dataType: "json",
                type: "GET",
                url: url,
                success: function(data){
                    contentTurno.html('');
                    $.each(data, function(id, value){
                        contentTurno.append('<label>'+value.nombre+'</label><input type="radio" class="input_check_turno" name="radio-choice-b" id="'+value.id+'">');
                    });
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
                    contentCalificar.html('');
                    $.each(data, function(id, value){
                        contentCalificar.append('<label>'+value.nombre+'</label><input data-id="'+value.id+'" type="range" class="slide" min="0" max="100" value="50"/>');
                    });
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
                    contentCarreras.html('');
                    $.each(data, function(id, value){
                        contentCarreras.append('<option value='+value.id+'>'+value.nombre+'</option>');
                    });
                    //$.mobile.changePage("otherPage.html");
                }
            });
        }
        function evtActualizarProfile(){
            var token = $('#token').val();
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
        // function evtSaberCursoDelDia(){
        //     var token = $('#token').val();
        //     var data = {
        //             'token':token
        //         };
        //     var url =  domain +'curso';
        //     $.ajax({
        //         dataType: "json",
        //         type: "POST",
        //         url: url,
        //         data:data,
        //         success: function(data){
        //             var id_curso = data.id,
        //                 profesor = data.profesor,
        //                 curso = data.curso;
        //             contentSaber.children('ul').html('');
        //             contentSaber.children('ul').append('<li>Profesor: ID:'+profesor+' | Curso: '+curso+'</li>');
        //             $('#idCurso').val(id_curso);
        //         }
        //     });
        // }
        function evtCalificar(){
            var token = $('#token').val(),
                curso = $('#idCurso').val();

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

    });
});