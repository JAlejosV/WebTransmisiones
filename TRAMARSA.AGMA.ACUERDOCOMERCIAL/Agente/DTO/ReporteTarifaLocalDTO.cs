using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ReporteTarifaLocalDTO
    {
        public string CodigoLinea { get; set; }
        public string DescripcionLinea { get; set; }
        public int CodigoTarifaLocal { get; set; }
        public string CodigoConcepto { get; set; }
        public string CodigoTarifa { get; set; }
        public string DescripcionTarifa { get; set; }
        public string CodigoMoneda { get; set; }
        public string DescripcionMoneda { get; set; }
        public decimal Monto { get; set; }
        public string CodigoSucursal { get; set; }
        public string Sucursal { get; set; }
        public DateTime? VigenciaDesde { get; set; }
        public DateTime? VigenciaHasta { get; set; }
        public string CodigoTerminalPortuario { get; set; }
        public string TerminalPortuario { get; set; }
        public string CodigoTarifaLigadaLocal { get; set; }
        public string CodigoConceptoTarifaLigada { get; set; }
        public string CodigoTarifaTarifaLigada { get; set; }
        public string DescripcionTarifaTarifaLigada { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }

    }
}