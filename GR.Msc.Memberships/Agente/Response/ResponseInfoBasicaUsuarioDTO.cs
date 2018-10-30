using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GR.Msc.Memberships.Agente.Response
{
    public class ResponseInfoBasicaUsuarioDTO
    {
        /// <summary>
        /// Lista Info Basica Usuarios
        /// Tipo: IEnumerable<ResponseListaUsuarios> 
        /// </summary>
        public IEnumerable<ResponseListaUsuarios> ListaInfoBasicaUsuarios { get; set; }
    }
}