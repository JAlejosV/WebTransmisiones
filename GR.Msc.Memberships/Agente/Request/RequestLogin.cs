using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GR.Msc.Memberships.Agente.Request
{
    /// <summary>
    /// clase para Request Login
    /// </summary>
    public class RequestLogin
    {
        /// <summary>
        /// Acronimo Aplicacion
        /// Tipo: string 
        /// Longitud: 20
        /// </summary>
        public string AcronimoAplicacion { get; set; }
        /// <summary>
        /// Clave
        /// Tipo: string 
        /// Longitud: 255
        /// </summary>
        public string Clave { get; set; }
        /// <summary>
        /// Codigo Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string CodigoUsuario { get; set; }
        /// <summary>
        /// Dominio
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string Dominio { get; set; }
    }
}