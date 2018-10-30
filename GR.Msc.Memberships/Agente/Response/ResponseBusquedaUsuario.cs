using System.Collections.Generic;
using GR.Frameworks.Comun.DTO;

namespace GR.Msc.Memberships.Agente.Response
{
    public class ResponseBusquedaUsuario
    {
        public List<ResponseUsuarioDTO> UsuarioXRecursoValorList { get; set; }
        public ResultEn Result { get; set; }
        public ResponseBusquedaUsuario()
        {
            UsuarioXRecursoValorList = new List<ResponseUsuarioDTO>();
            this.Result = new ResultEn();
        }
    }
}