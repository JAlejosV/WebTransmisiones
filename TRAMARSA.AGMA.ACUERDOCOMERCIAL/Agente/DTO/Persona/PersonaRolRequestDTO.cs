using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Persona
{
    public class PersonaRolRequestDTO
    {
        public Int64? CodigoPersona { get; set; }
        public Int64? CodigoRol { get; set; }
        public string NombreRol { get; set; }
        public string CodigoAduanaPersonaRol { get; set; }
        public string Accion { get; set; }
    }
}