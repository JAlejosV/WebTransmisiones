using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Persona
{
    public class PersonaRolDTO
    {
        public Int64? CodigoPersona { get; set; }
        public long CodigoRol { get; set; }
        public string NombreRol { get; set; }
        public string CodigoAduanaPersonaRol { get; set; }
        public string Accion { get; set; }
    }
}