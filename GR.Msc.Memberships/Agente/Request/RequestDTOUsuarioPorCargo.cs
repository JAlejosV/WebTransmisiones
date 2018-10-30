using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GR.Msc.Memberships.Agente.Request
{
    /// <summary>
    /// clase para Request DTOUsuario Por Cargo
    /// </summary>
    public class RequestDTOUsuarioPorCargo
    {
        /// <summary>
        /// Acronimo
        /// Tipo: string 
        /// Longitud: 20
        /// </summary>
        public string Acronimo { get; set; }
        /// <summary>
        /// Codigo Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string CodigoUsuario { get; set; }
        /// <summary>
        /// Codigos Cargo
        /// Tipo: List<string> 
        /// </summary>
        public List<string> CodigosCargo { get; set; }
        /// <summary>
        /// DNI
        /// Tipo: string 
        /// Longitud: 11
        /// </summary>
        public string DNI { get; set; }
        /// <summary>
        /// Dominio
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string Dominio { get; set; }
        /// <summary>
        /// Nombre
        /// Tipo: string 
        /// Longitud: 120
        /// </summary>
        public string Nombre { get; set; }
        /// <summary>
        /// Sede
        /// Tipo: string 
        /// Longitud: 4
        /// </summary>
        public string Sede { get; set; }
        /// <summary>
        /// Sociedad
        /// Tipo: string 
        /// Longitud: 3
        /// </summary>
        public string Sociedad { get; set; }
        /// <summary>
        /// Tipo Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string TipoUsuario { get; set; }
    }
}