using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GR.Msc.Memberships.Agente.Response
{
    /// <summary>
    /// clase para Response Lista Usuarios
    /// </summary>
    public class ResponseListaUsuarios
    {
        /// <summary>
        /// Cargo
        /// Tipo: string 
        /// Longitud: 255
        /// </summary>
        public string Cargo { get; set; }
        /// <summary>
        /// Codigo Cargo
        /// Tipo: string 
        /// Longitud: 10
        /// </summary>
        public string CodigoCargo { get; set; }
        /// <summary>
        /// Codigo Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string CodigoUsuario { get; set; }
        /// <summary>
        /// Correo
        /// Tipo: string 
        /// Longitud: 120
        /// </summary>
        public string Correo { get; set; }
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