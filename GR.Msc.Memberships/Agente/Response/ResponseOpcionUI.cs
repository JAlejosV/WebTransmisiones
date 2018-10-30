using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GR.Msc.Memberships.Agente.Response
{
    /// <summary>
    /// clase para Response Opcion UI
    /// </summary>
    public class ResponseOpcionUI
    {
        /// <summary>
        /// Clase
        /// Tipo: string 
        /// Longitud: 20
        /// </summary>
        public string Clase { get; set; }
        /// <summary>
        /// Codigo
        /// Tipo: string 
        /// Longitud: 10
        /// </summary>
        public string Codigo { get; set; }
        /// <summary>
        /// Conceder
        /// Tipo: bool 
        /// </summary>
        public bool Conceder { get; set; }
        /// <summary>
        /// Control Padre
        /// Tipo: string 
        /// Longitud: 20
        /// </summary>
        public string ControlPadre { get; set; }

        /// <summary>
        /// Id Opcion
        /// Tipo: string
        /// Longitud: 10
        /// </summary>

        public string IdOpcion { get; set; }
        /// <summary>
        /// Nombre Control
        /// Tipo: string 
        /// Longitud: 3
        /// </summary>
        public string NombreControl { get; set; }
        /// <summary>
        /// Opciones
        /// Tipo: List<ResponseOpcionUI> 
        /// </summary>
        public List<ResponseOpcionUI> Opciones { get; set; }
        /// <summary>
        /// Tipo
        /// Tipo: string 
        /// Longitud: 20
        /// </summary>
        public string Tipo { get; set; }
        /// <summary>
        /// Url
        /// Tipo: string 
        /// Longitud: 255
        /// </summary>
        public string Url { get; set; }
    }
}