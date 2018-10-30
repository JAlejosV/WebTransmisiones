using System.Collections.Generic;
using GR.Frameworks.Comun.DTO;

namespace GR.Msc.Memberships.Agente.Response
{
    public class ResponseRol
    {
        public List<ResponseRolDTO> RolesUsuarioList { get; set; }
        public ResultEn Result { get; set; }
        public ResponseRol()
        {
            RolesUsuarioList = new List<ResponseRolDTO>();
            this.Result = new ResultEn();
        }
    }
}