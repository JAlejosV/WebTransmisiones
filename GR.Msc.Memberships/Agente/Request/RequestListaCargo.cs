using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GR.Msc.Memberships.Agente.Request
{
    /// <summary>
    /// clase para Request Lista Cargo
    /// </summary>
    public class RequestListaCargo
    {
        /// <summary>
        /// Cod Sociedad Propietaria
        /// Tipo: string 
        /// Longitud: 3
        /// </summary>
        public string CodSociedadPropietaria { get; set; }
    }
}