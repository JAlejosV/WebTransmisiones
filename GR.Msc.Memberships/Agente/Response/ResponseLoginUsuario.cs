using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GR.Msc.Memberships.Agente.Response
{
    /// <summary>
    /// clase para Response Login Usuario
    /// </summary>
    public class ResponseLoginUsuario
    {
        /// <summary>
        /// Id Perfil Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string IdPerfilUsuario { get; set; }
        /// <summary>
        /// Mensaje Error
        /// Tipo: string 
        /// Longitud: 60
        /// </summary>
        public string MensajeError { get; set; }
        /// <summary>
        /// Resultado Login
        /// Tipo: bool 
        /// </summary>
        public bool ResultadoLogin { get; set; }
    }
}