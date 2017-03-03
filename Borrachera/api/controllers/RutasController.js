/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    home: function (req, res) {
        return res.view('home');
    },
    listarUsuario: function (req, res) {

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
    },
    crearUsuario: function (req, res) {
        return res.view('vistasUsuario/CrearUsuario');
    },
    actualizarUsuario: function (req, res) {
        return res.view('vistasUsuario/ActualizarUsuario');
    },
    listarBorrachera: function (req, res) {
        return res.view('vistasBorrachera/ListarBorrachera');
    },
    crearBorrachera: function (req, res) {
        return res.view('vistasBorrachera/CrearBorrachera');
    },
    actualizarBorrachera: function (req, res) {
        return res.view('vistasBorrachera/ActualizarBorrachera');
    },
    error: function (req, res) {
        return res.view('vistaError/Error', {
            error: {
                desripcion: "Usted esta por error en esta Ruta dirijase a Inicio",
                rawError: "Ruta equivocada",
                url: "/Inicio"
            }
        });
    }

};