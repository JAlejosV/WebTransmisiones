using System;
using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ReporteACEscalonadoRequestViewModel
    {
        public string CodigoLinea { get; set; }
        public string CodigoMoneda { get; set; }
        public string CodigoSucursal { get; set; }
        public string CodigoRA { get; set; }
        public int? CodigoAcuerdoComercialEscalonado { get; set; }
        public string CodigoCliente { get; set; }
        public DateTime? FinVigencia { get; set; }
        public bool FlagVigente { get; set; }
        public string NumeroBL { get; set; }
        public string CodigoContenedor { get; set; }
        public string TipoBL { get; set; }
    }
}