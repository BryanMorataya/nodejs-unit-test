class PagoDetalleRepo {
    async findOne (_qry) {
        return PagoDetalle.findOne({ id: _pagoDetalleId })
    }

    async find (_qry) {
        return PagoDetalle.find({ id: _pagoDetalleId })
    }
}


module.exports = PagoDetalleRepo;