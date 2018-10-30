using System.Collections.Generic;
using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ResponseListarRolCiente
    {
        public List<ListaRolClienteDTO> ListaRolesClientes { get; set; }
        public Result Result { get; set; }
        public ResponseListarRolCiente()
        {
            ListaRolesClientes = new List<ListaRolClienteDTO>();
            this.Result = new Result();
        }
    }
}