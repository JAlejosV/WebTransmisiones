using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class AcuerdoComercialLocalAgenteBLMasterRequestViewModel
    {

        public int? CodigoAcuerdoComercialLocal { get; set; }
        public string CodigoAgente { get; set; }
        public string CodigoDocumentoAgente { get; set; }
        public int? CodigoRol { get; set; }
        public string Accion { get; set; }

    }
}