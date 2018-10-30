using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class AcuerdoComercialLocalPuertoRequestViewModel
    {
        public int? CodigoAcuerdoComercialLocal { get; set; }
        public string CodigoPuerto { get; set; }
        public string CodigoTipoPuerto { get; set; }
        public string Accion { get; set; }
    }
}