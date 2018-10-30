using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Persona;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Persona
{
    public class RequestRegistrarPersonaViewModel
    {
        public Int64? CodigoPersona { get; set; }
        public Int64? CodigoTipoDocumento { get; set; }
        public string NombreTipoDocumento { get; set; }
        public Int64? CodigoPais { get; set; }
        public string NombrePais { get; set; }
        public string RazonSocialPersona { get; set; }
        public string NumeroDocumentoPersona { get; set; }
        public string DireccionPersona { get; set; }
        public string TelefonoPersona { get; set; }
        public string EmailPersona { get; set; }
        public string ContactoPersona { get; set; }
        public string WebPersona { get; set; }
        public bool EstadoRegistro { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public string Accion { get; set; }

        public List<PersonaRolViewModel> ListaPersonaRol { get; set; }

        public RequestRegistrarPersonaViewModel()
        {
            ListaPersonaRol = new List<PersonaRolViewModel>();
        }
    }
}