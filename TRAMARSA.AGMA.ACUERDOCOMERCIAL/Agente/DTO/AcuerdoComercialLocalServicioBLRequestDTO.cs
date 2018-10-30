using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class AcuerdoComercialLocalServicioBLRequestDTO
    {

        public int? CodigoAcuerdoComercialLocal { get; set; }
        public string CodigoServicio { get; set; }
        public string Accion { get; set; }

    }
}