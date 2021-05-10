class ItemPagoCalculadoDetalleRepo {

    async find (_qry) {
        return ItemPagoCalculadoDetalle.find({ id: _pagoDetalleId })
    }

}


module.exports = ItemPagoCalculadoDetalleRepo;