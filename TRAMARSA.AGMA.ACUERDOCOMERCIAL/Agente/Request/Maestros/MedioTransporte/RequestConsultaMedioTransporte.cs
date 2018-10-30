using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.MedioTransporte
{
    public class RequestConsultaMedioTransporte : BaseRequest
    {
        public Int64? CodigoMedioTransporte { get; set; }
        public Byte? CodigoMedioTransporteSunat { get; set; }
        public string NombreMedioTransporte { get; set; }
    }
}