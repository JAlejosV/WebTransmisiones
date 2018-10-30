using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class AcuerdoComercialLocalTipoContenedorRequestViewModel
    {

        public int? CodigoAcuerdoComercialLocal { get; set; }
        public string CodigoClaseContenedor { get; set; }
        public string CodigoTipoContenedor { get; set; }
        public string Accion { get; set; }

    }
}