/**
 * Borrachera.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        motivo: {
            type: 'string',
            required: true
        },
        latitudEmpezo: {
            type: 'integer'
        },
        longitudEmpezo: {
            type: 'integer'
        },
        idUsuario: {
            model: 'Usuario',
            required: true
        }
    }
};