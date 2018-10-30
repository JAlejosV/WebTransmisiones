using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GR.Msc.Memberships.Agente.Request
{
    /// <summary>
    /// clase para Request Listar Usuario
    /// </summary>
    public class RequestListarUsuario
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
        /// Nombres
        /// Tipo: string 
        /// Longitud: 120
        /// </summary>
        public string Nombres { get; set; }
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