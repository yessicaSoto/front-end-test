const app = new Vue({
    el: '#app',

    data: {
        empleado: {
            NoEmpleado: '',
            Sexo: '',
            CURP: '',
            Empresa: '',
            Departamento: '',
            Puesto: '',
            Turno: '',
            NombreCompleto: ''
        },
        idUsuario: ''
    },
    methods: {

        buscar: function () {
            debugger;
            event.preventDefault();
            $("#tabla").css('display', 'none');
            var self = this
            var message = '';
            var error = false;
            if (this.idUsuario.length < 4) {
                message = 'Por favor escriba al menos 4 caracteres';
                error = true;
            }
            if (this.idUsuario == null || this.idUsuario == '') {
                message = 'Debe escribir un id de  usuario';
                error = true;
            }
            if (this.idUsuario == 'sanimedical') {
                debugger;
                message = 'Este usuario no se puede buscar';
                this.idUsuario = '';
                error = true;
            }
          
            if (error) {
                this.mensajeError(message);
            }
            else {
                $("#loader").css('display', 'block');
                axios.get('https://api.github.com/search/users?q=' + this.idUsuario).then(response => {

                    var datos = response.data != null && response.data != null ? response.data.items.slice(0, 10) : [];
                    let columnas = [
                        { "data": "id" },
                        {
                            "width": "100px",
                            "className": "text-center",
                            "data": function (data, type, row) {
                                return `<a href="` + "https://github.com/" + data.login + `"  target="_blank"> ` + data.login + `</a>`;
                            }
                        },
                        {
                            "width": "100px",
                            "className": "text-center",
                            "data": function (data, type, row) {
                                return `<img src="` + data.avatar_url + `" width="100" height="100">`;
                            }
                        }

                    ];

                    $("#tblUsuarios").DataTable().clear().destroy();
                    $('#tblUsuarios').DataTable({
                        data: datos,
                        columns: columnas
                    });
                    $("#loader").css('display', 'none');
                    $("#tabla").css('display', 'block');

                }).catch(function (error) {
                    $("#loader").css('display', 'none');
                    $("#tabla").css('display', 'none');
                    self.mensajeError(error);
                });
            }


        },

        mensajeError: function (mensaje) {
            $("body").overhang({
                type: "error",
                message: mensaje,
                closeConfirm: true
            });
        },

    },
    mounted: function () {
        debugger;
        $("#tabla").css('display', 'none');

    }
})
