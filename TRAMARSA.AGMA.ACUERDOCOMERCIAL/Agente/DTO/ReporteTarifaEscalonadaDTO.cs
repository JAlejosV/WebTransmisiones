using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ReporteTarifaEscalonadaDTO
    {
        public string CodigoLinea { get; set; }
        public string DescripcionLinea { get; set; }
        public string CodigoConcepto { get; set; }
        public string CodigoTarifa { get; set; }
        public string DescripcionTarifa { get; set; }
        public string CodigoMoneda { get; set; }
        public string DescripcionMoneda { get; set; }
        public string CodigoSucursal { get; set; }
        public string Sucursal { get; set; }
        //public DateTime? VigenciaDesde { get; set; }
        //public DateTime? VigenciaHasta { get; set; }
        public int CodigoPeriodo { get; set; }
        public string CodigoTipoContenedor { get; set; }
        public int NumeroDias { get; set; }
        public decimal Monto { get; set; }
        public int? CodigoTarifaLigadaLocal { get; set; }
        public string CodigoConceptoTarifaLigadaLocal { get; set; }
        public string CodigoTarifaTarifaLigadaLocal { get; set; }
        public string DescripcionTarifaTarifaLigadaLocal { get; set; }
        public decimal MontoLigado { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
    }
}