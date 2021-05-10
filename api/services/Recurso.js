class Recurso {
    async calculado(_params) {
        try {
            let {
                _pagoDetalleId,
                itempago,
            } = _params;
            let _pagoDetalleData = await PagoDetalleRepo.findOne({ id: _pagoDetalleId });
            if (!_pagoDetalleData)
                throw Error(`Recurso externo calculado - No se encontro data del detalle pago ${_pagoDetalleId}`);

            let _pagoDetalle = await PagoDetalleRepo.find({
                pago: _pagoDetalleData.pago,
                deletedAt: null,
            });
            if (!_pagoDetalle || _pagoDetalle.length == 0)
                throw Error(`Recurso externo calculado - No se encontro detalle del pago ${_pagoDetalleData.pago}`);

            let result = {
                cantidad: 1,
                tasa: 0,
                detalle: [],
            };
            let arrCalc = await ItemPagoCalculadoDetalle.find({
                itempagomaestro: itempago,
                deletedAt: null,
            });

            let _newDetail = _pagoDetalle.map((_el) => {
                let _newTasa = _el.tasa;
                if (_el.itempago == itempago) {
                    _el.calculado = arrCalc;
                    if (!(_el.calculado && _el.calculado.length > 0)) {
                        if (_el.monto == null) {
                            return { ..._el, monto: 0 };
                        }
                        return _el;
                    }
                    // Si es calculado realiza el calculo necesario.
                    _newTasa = _el.calculado.reduce((carry, val) => {
                        let recursoObj = _pagoDetalle.find(
                            (el) => el.itempago == val.itempagorecurso
                        );
                        console.log(recursoObj);
                        if (!recursoObj) {
                            return carry;
                        }
                        let monto = 0;
                        if (val.es_fraccion == true) {
                            monto =
                                recursoObj.monto *
                                (val.fraccion_numerador / val.fraccion_denominador);
                        } else {
                            monto = recursoObj.monto * (val.porcentaje / 100);
                        }
                        
                        return carry + monto;
                    }, 0);
                    result.tasa = _newTasa;
                }

                return { ..._el, tasa: _newTasa };
            });

            result.detalle = _newDetail;

            return {
                data: result,
                status: 200,
            };
        } catch (e) {
            return {
                data: {
                    cantidad: 0,
                    error: e,
                    _params,
                },
                status: e.code || 500,
            };
        }
    }
}
module.exports = Recurso;