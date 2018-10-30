using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GR.Msc.Memberships.Agente.Response
{
    /// <summary>
    /// clase para Response Usuario Cargo
    /// </summary>
    public class ResponseUsuarioCargo
    {
        /// <summary>
        /// Codigo Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string CodigoUsuario { get; set; }
        /// <summary>
        /// Correo Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string CorreoUsuario { get; set; }
        /// <summary>
        /// DNI
        /// Tipo: string 
        /// Longitud: 11
        /// </summary>
        public string DNI { get; set; }
        /// <summary>
        /// Id Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string IdUsuario { get; set; }
        /// <summary>
        /// Nombres Completos
        /// Tipo: string 
        /// Longitud: 120
        /// </summary>
        public string NombresCompletos { get; set; }
    }
}