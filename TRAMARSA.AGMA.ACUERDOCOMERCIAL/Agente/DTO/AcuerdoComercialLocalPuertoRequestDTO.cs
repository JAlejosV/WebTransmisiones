using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class AcuerdoComercialLocalPuertoRequestDTO
    {
        public int? CodigoAcuerdoComercialLocal { get; set; }
        public string CodigoPuerto { get; set; }
        public string CodigoTipoPuerto { get; set; }
        public string Accion { get; set; }
    }
}