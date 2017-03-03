/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing Usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


    CrearUsuario: function (req, res) {

        if (req.method == "POST") {

            var parametros = req.allParams();

            if (parametros.nombre && parametros.ciudadResidencia) {

                var usuarioCrear = {
                    nombre: parametros.nombre,
                    ciudadResidencia: parametros.ciudadResidencia,
                    fechaNacimiento: parametros.fechaNacimiento
                }

                if (usuarioCrear.fechaNacimiento == "") {
                    delete usuarioCrear.fechaNacimiento
                }

                Usuario.create(usuarioCrear).exec(function (err, usuarioCreado) {

                    if (err) {
                        return res.view('vistaError/Error', {
                            error: {
                                desripcion: "Fallo al crear el Usuario",
                                rawError: err,
                                url: "/CrearUsuario"
                            }

                        });
                    }

                    Usuario.find()
                        .exec(function (errorIndefinido, usuariosEncontrados) {

                            if (errorIndefinido) {
                                res.view('vistaError/Error', {
                                    error: {
                                        desripcion: "Hubo un problema cargando los Usuarios",
                                        rawError: errorIndefinido,
                                        url: "/ListarUsuario"
                                    }
                                });
                            }

                            res.view('vistasUsuario/ListarUsuario', {
                                usuarios: usuariosEncontrados
                            });
                        })

                })


            } else {

                return res.view('vistaError/Error', {
                    error: {
                        desripcion: "Llena todos los parametros, nombre y fecha de residencia",
                        rawError: "Fallo en envio de parametros",
                        url: "/CrearUsuario"
                    }

                });

            }
        } else {

            return res.view('vistaError/Error', {
                error: {
                    desripcion: "Error en el uso del Metodo HTTP",
                    rawError: "HTTP Invalido",
                    url: "/CrearUsuario"
                }
            });

        }

    },
    EliminarUsuario: function (req, res) {

        var parametros = req.allParams();

        if (parametros.id) {

            Usuario.destroy({
                id: parametros.id
            }).exec(function (errorInesperado, UsuarioRemovido) {
                if (errorInesperado) {
                    return res.view('error', {
                        error: {
                            desripcion: "Tuvimos un Error Inesperado",
                            rawError: errorInesperado,
                            url: "/ListarUsuario"
                        }
                    });
                }
                Usuario.find()
                    .exec(function (errorIndefinido, usuariosEncontrados) {

                        if (errorIndefinido) {
                            res.view('error', {
                                error: {
                                    desripcion: "Hubo un problema cargando los Usuarios",
                                    rawError: errorIndefinido,
                                    url: "/ListarUsuario"
                                }
                            });
                        }

                        res.view('vistasUsuario/listarUsuario', {
                            usuarios: usuariosEncontrados
                        });
                    })
            })

        } else {
            return res.view('error', {
                error: {
                    desripcion: "Necesitamos el ID para borrar al Usuario",
                    rawError: "No envia ID",
                    url: "/ListarUsuarios"
                }
            });
        }
    },
    ActualizarUsuario: function (req, res) {

        var parametros = req.allParams();

        if (parametros.idUsuario && (parametros.nombres || parametros.apellidos || parametros.correo)) {

            var usuarioAEditar = {
                nombres: parametros.nombres,
                apellidos: parametros.apellidos,
                correo: parametros.correo,
                password: parametros.password
            }

            if (usuarioAEditar.nombres == "") {
                delete usuarioAEditar.nombres
            }
            if (usuarioAEditar.apellidos == "") {
                delete usuarioAEditar.apellidos
            }
            if (usuarioAEditar.correo == "") {
                delete usuarioAEditar.correo
            }
            if (usuarioAEditar.password == "") {
                delete usuarioAEditar.password
            }


            Usuario.update({
                    id: parametros.idUsuario
                }, usuarioAEditar)
                .exec(function (errorInesperado, UsuarioRemovido) {
                    if (errorInesperado) {
                        return res.view('vistas/Error', {
                            error: {
                                desripcion: "Tuvimos un Error Inesperado",
                                rawError: errorInesperado,
                                url: "/ListarUsuarios"
                            }
                        });
                    }

                    Usuario.find()
                        .exec(function (errorIndefinido, usuariosEncontrados) {

                            if (errorIndefinido) {
                                res.view('vistas/Error', {
                                    error: {
                                        desripcion: "Hubo un problema cargando los Usuarios",
                                        rawError: errorIndefinido,
                                        url: "/ListarUsuarios"
                                    }
                                });
                            }

                            res.view('vistas/Usuario/ListarUsuarios', {
                                usuarios: usuariosEncontrados
                            });
                        })

                })






        } else {
            return res.view('vistas/Error', {
                error: {
                    desripcion: "Necesitamos que envies el ID y el nombre, apellido o correo",
                    rawError: "No envia Parametros",
                    url: "/ListarUsuarios"
                }
            });
        }



    }

};