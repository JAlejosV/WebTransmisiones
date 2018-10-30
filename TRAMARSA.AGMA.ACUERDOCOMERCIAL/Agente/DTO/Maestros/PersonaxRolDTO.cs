using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros
{
    public class PersonaxRolDTO
    {
        public Int64? CodigoPersona { get; set; }
        public string RazonSocialPersona { get; set; }
        public string NumeroDocumentoPersona { get; set; }
        public string NombreTipoDocumento { get; set; }
        public string NombrePais { get; set; }
    }
}