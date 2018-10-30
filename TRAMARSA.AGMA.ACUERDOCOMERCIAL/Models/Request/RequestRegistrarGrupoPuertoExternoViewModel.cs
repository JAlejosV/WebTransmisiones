using System;
using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.AcuerdoComercial;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestRegistrarGrupoPuertoExternoViewModel
    {
        public int CodigoAcuerdoComercialEscalonado { get; set; }
        public string Estado { get; set; }
        public string CodigoLinea { get; set; }

    }
}