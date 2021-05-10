const asset = require('assert');
const sinon = require('sinon');
const recurso = require('../api/services/Recurso');
const PagoDetalleRepo = require('../api/repositories/PagoDetalleRepo');
const ItemPagoCalculadoDetalleRepo = require('../api/repositories/ItemPagoCalculadoDetalleRepo');

describe('two items pago', () => {
    it('second test two items', async () => {
        const dataOne = {
            "id": 70962,
            "createdAt": "2021-05-10T14:54:04+00:00",
            "updatedAt": "2021-05-10T14:54:04+00:00",
            "deletedAt": null,
            "cantidadunidadpago": 1,
            "tasa": "217.35",
            "monto": "217.35",
            "descripcion": null,
            "orderat": 2,
            "pago": 7243,
            "cuentacontable": null,
            "itempago": 346,
            "unidad": "5",
            "empresa": null
        }
        const dataAll = [
            {
                "id": 70969,
                "deletedAt": null,
                "cantidadunidadpago": 1,
                "tasa": "437.40",
                "monto": "437.40",
                "itempago": 315,
                "unidad": "5"
            },
            {
                "id": 70968,
                "deletedAt": null,
                "cantidadunidadpago": 1,
                "tasa": "375.00",
                "monto": "375.00",
                "itempago": 313,
                "unidad": "5"
            },
            {
                "id": 70967,
                "deletedAt": null,
                "cantidadunidadpago": 1,
                "tasa": "375.00",
                "monto": "375.00",
                "itempago": 314,
                "unidad": "5"
            },
            {
                "id": 70966,
                "deletedAt": null,
                "cantidadunidadpago": 1,
                "tasa": "480.15",
                "monto": "480.15",
                "itempago": 317,
                "unidad": "5"
            },
            {
                "id": 70965,
                "deletedAt": null,
                "cantidadunidadpago": 1,
                "tasa": "45.00",
                "monto": "45.00",
                "itempago": 319,
                "unidad": "5"
            },
            {
                "id": 70964,
                "deletedAt": null,
                "cantidadunidadpago": 1,
                "tasa": "45.00",
                "monto": "45.00",
                "itempago": 318,
                "unidad": "5"
            },
            {
                "id": 70963,
                "deletedAt": null,
                "cantidadunidadpago": null,
                "tasa": "1.00",
                "monto": null,
                "itempago": 311,
                "unidad": "5"
            },
            {
                "id": 70962,
                "deletedAt": null,
                "cantidadunidadpago": 1,
                "tasa": "217.35",
                "monto": "217.35",
                "itempago": 346,
                "unidad": "5"
            },
            {
                "id": 70961,
                "deletedAt": null,
                "cantidadunidadpago": 1,
                "tasa": "250.00",
                "monto": "250.00",
                "itempago": 340,
                "unidad": "1"
            },
            {
                "id": 70960,
                "deletedAt": null,
                "cantidadunidadpago": 1,
                "tasa": "4500.00",
                "monto": "4500.00",
                "itempago": 339,
                "unidad": "1"
            }
        ]

        sinon.stub(PagoDetalleRepo, 'findOne').callsFake(() => dataOne);
        sinon.stub(PagoDetalleRepo, 'find').callsFake(() => dataAll);

        const dataPago = [
            {
                "id": 221,
                "deletedAt": null,
                "porcentaje": 4.83,
                "editable": false,
                "es_fraccion": false,
                "fraccion_numerador": null,
                "fraccion_denominador": null,
                "itempagomaestro": 346,
                "itempagorecurso": 339
            },
            {
                "id": 222,
                "deletedAt": null,
                "porcentaje": 4.83,
                "editable": false,
                "es_fraccion": false,
                "fraccion_numerador": null,
                "fraccion_denominador": null,
                "itempagomaestro": 346,
                "itempagorecurso": 338
            },
            {
                "id": 279,
                "deletedAt": null,
                "porcentaje": 4.83,
                "editable": false,
                "es_fraccion": false,
                "fraccion_numerador": null,
                "fraccion_denominador": null,
                "itempagomaestro": 346,
                "itempagorecurso": 392
            },
            {
                "id": 276,
                "deletedAt": null,
                "porcentaje": 4.83,
                "editable": false,
                "es_fraccion": false,
                "fraccion_numerador": null,
                "fraccion_denominador": null,
                "itempagomaestro": 346,
                "itempagorecurso": 341
            },
            {
                "id": 277,
                "deletedAt": null,
                "porcentaje": 4.83,
                "editable": false,
                "es_fraccion": false,
                "fraccion_numerador": null,
                "fraccion_denominador": null,
                "itempagomaestro": 346,
                "itempagorecurso": 349
            },
            {
                "id": 278,
                "deletedAt": null,
                "porcentaje": 4.83,
                "editable": false,
                "es_fraccion": false,
                "fraccion_numerador": null,
                "fraccion_denominador": null,
                "itempagomaestro": 346,
                "itempagorecurso": 340
            }
        ]

        sinon.stub(ItemPagoCalculadoDetalleRepo, 'find').callsFake(() => dataPago);
        const sendData = {
            _pagoDetalleId: 1,
            itempago: 346
        }
        const resp = await recurso.calculado(sendData);
        asset(resp.data.tasa == 229.43);
    })

    after(() => {
        sinon.restore();
    });
    afterEach(() => {
        sinon.restore();
    });
})