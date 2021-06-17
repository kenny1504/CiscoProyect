var tblTipoTransporte = null;



          setTimeout(function () {
                showLoad(true);
                listarTipoTransporte();
        }, 300);


    /** Funcion que lista todos los registro de tipo de transporte */
    function listarTipoTransporte() {

        var _token= $('input[name=csrfmiddlewaretoken]').val();
       tblTipoTransporte= $('#tblTipoTransporte').DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        deferRender: true,
            ajax: {
                type: 'POST',
                url: window.location.pathname, //llamada a la ruta
                data: {
                    'action':'getdata'
                },
               dataSrc: ""
        },
        "language": {
                    "sProcessing": "Procesando...",
                    "sLengthMenu": "Mostrar _MENU_ registros",
                    "sZeroRecords": "No se encontraron resultados",
                    "sEmptyTable": "Ning&uacute;n dato disponible en esta tabla",
                    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sSearch": "Buscar:",
                    "sUrl": "",
                    "sInfoThousands": ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst": "Primero",
                        "sLast": "&Uacute;ltimo",
                        "sNext": "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }
                },
        columns: [
            {"data": "id"},
            {"data": "nombre"},
            {}
        ],
            columnDefs: [
                {
                    targets: -1,
                    data: null,
                    orderable: false,
                    defaultContent: '<i class="btn btn-info fa fa-edit" title="Selecciona el registro" onclick="selectTipoTransporte(this)"></i>'
                }
            ]
        });

        /** se ejecuta despues que la tabla cargo datos, GIF CARGANDO */
        $('#tblTipoTransporte').DataTable().on("draw", function(){
            showLoad(false);
        })

    }

    /** Funcion que permite actualizar o agregar un nuevo registro */
    function guardar()
    {
        var _token = $('input[name=_token]').val();
        var id_TipoTransporte= $('#id_TipoTransporte').val();
        var nombre= $('#txt_nombre').val();


        if (nombre!="" )
        {
            alertConfirm("¿Está seguro que desea guardar?", function (e) {
                showLoad(true);
                $.ajax({
                    type: 'POST',
                    url: '/tipoTransporte/guardar', //llamada a la ruta
                    data: {
                        _token:_token,
                        id_TipoTransporte:id_TipoTransporte,
                        nombre:nombre
                    },
                    success: function (data) {
                        showLoad(false);
                        if (data.error) {
                            alertError(data.mensaje);
                        }
                        else
                        {
                            alertSuccess(data.mensaje);
                            tblTipoTransporte.ajax.reload();
                            resetForm();
                        }
                    },
                    error: function (err) {
                        alertError(err.responseText);
                        showLoad(false);
                    }

                });
            });
        }
        else
            alertError("Favor ingrese nombre");
    }

    /** Limpia el formulario */
    function resetForm() {
        $("#id_TipoTransporte,#txt_nombre").val("");
        $('#btnEliminarTipoTransporte').attr("disabled", "FALSE");
    }

    /** Selecciona el tipo de transporte y carga valores en formulario */
    function selectTipoTransporte(datos) {

        var tr = $(datos).parents("tr")
        var data = tblTipoTransporte.row(tr).data();
        $('#btnEliminarTipoTransporte').removeAttr('disabled');

        //Capturamos valores de tabla
        Tipo = {
            id_TipoTransporte: data.id,
            nombre:data.nombre
        };

        //Asignamos valores a formulario
        $('#id_TipoTransporte').val(Tipo.id_TipoTransporte);
        $('#txt_nombre').val(Tipo.nombre);

    }

    /** Funcion para eliminar registro*/
    function eliminar()
    {
        var id_TipoTransporte= $('#id_TipoTransporte').val();
        var _token = $('input[name=_token]').val();

        if (id_TipoTransporte!="")
        {
            alertConfirm("¿Está seguro que desea eliminar?", function (e) {
                showLoad(true);
                $.ajax({
                    type: 'POST',
                    url: '/tipoTransporte/eliminar', //llamada a la ruta
                    data: {
                        _token:_token,
                        id_TipoTransporte:id_TipoTransporte
                    },
                    success: function (data) {
                        showLoad(false);
                        if (data.error) {
                            alertError(data.mensaje);
                        }
                        else
                        {
                            alertSuccess(data.mensaje);
                            tblTipoTransporte.ajax.reload();
                            resetForm();
                        }
                    },
                    error: function (err) {
                        alertError(err.responseText);
                        showLoad(false);
                    }

                });
            });
        }

    }
