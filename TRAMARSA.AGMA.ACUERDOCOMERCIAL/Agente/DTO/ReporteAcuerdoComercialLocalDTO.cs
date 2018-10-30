using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ReporteAcuerdoComercialLocalDTO
    {
        public int CodigoAcuerdoComercialLocal { get; set; }
        public string CodigoAgente { get; set; }
        public string CodigoCliente { get; set; }
        public string CodigoClienteHijo { get; set; }
        public string CodigoContenedor { get; set; }
        public string CodigoLinea { get; set; }
        public string CodigoPuertoDestino { get; set; }
        public string CodigoPuertoEmbarque { get; set; }
        public string CodigoPuertoFinal { get; set; }
        public string CodigoPuertoOrigen { get; set; }
        public string CodigoRA { get; set; }
        public string CodigoServicioBL { get; set; }
        public string CodigoServicioNave { get; set; }
        public string CodigoSucursal { get; set; }
        public string CodigoTipoContenedor { get; set; }
        public string CodigoUsuarioAutorizador { get; set; }
        public DateTime? FechaAutorizacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public DateTime? FinVigencia { get; set; }
        public DateTime? InicioVigencia { get; set; }
        public string Mercancia { get; set; }
        public string NroBkn { get; set; }
        public string NumeroBLHijo { get; set; }
        public string NumeroBLMaster { get; set; }
        public string TipoAgente { get; set; }
        public string TipoCliente { get; set; }
        public string TipoClienteHijo { get; set; }

        public string Agente { get; set; }
        public string Cliente { get; set; }
        public string ClienteHijo { get; set; }
        public string Linea { get; set; }
        public string PuertoDestino { get; set; }
        public string PuertoEmbarque { get; set; }
        public string PuertoFinal { get; set; }
        public string PuertoOrigen { get; set; }
        public string ServicioBL { get; set; }
        public string ServicioNave { get; set; }
        public string Sucursal { get; set; }

        public string PaisPuertoDestino { get; set; }
        public string PaisPuertoEmbarque { get; set; }
        public string PaisPuertoFinal { get; set; }
        public string PaisPuertoOrigen { get; set; }

        public string CodigoConcepto { get; set; }
        public string CodigoTarifa { get; set; }
        public string DescripcionTarifa { get; set; }
        public string CodigoTipoDescuento { get; set; }
        public string DescripcionTipoDescuento { get; set; }
        public decimal? ValorDescuento { get; set; }
    }
}