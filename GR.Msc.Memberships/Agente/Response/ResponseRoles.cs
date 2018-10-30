using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GR.Msc.Memberships.Agente.Response
{
    /// <summary>
    /// clase para Response Roles
    /// </summary>
    public class ResponseRoles
    {
        /// <summary>
        /// Codigo
        /// Tipo: string 
        /// Longitud: 10
        /// </summary>
        public string Codigo { get; set; }
        /// <summary>
        /// Descripcion
        /// Tipo: string 
        /// Longitud: 250
        /// </summary>
        public string Descripcion { get; set; }
        //[IgnoreDataMember]
        public string IdRol { get; set; }
    }
}