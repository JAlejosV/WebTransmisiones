using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GR.Msc.Memberships.Agente.Request
{
    /// <summary>
    /// clase para Request Info Basica Usuario DTO
    /// </summary>
    public class RequestInfoBasicaUsuarioDTO
    {
        /// <summary>
        /// Codigos Usuario
        /// Tipo: IList<string> 
        /// </summary>
        public IList<string> CodigosUsuario { get; set; }
    }
}