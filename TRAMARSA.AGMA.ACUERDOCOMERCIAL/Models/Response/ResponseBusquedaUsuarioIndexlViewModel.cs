using System.Collections.Generic;
using GR.Comun.DTO;
using GR.Msc.Memberships.Agente.Response;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseBusquedaUsuarioIndexlViewModel
    {
        public List<ListaLineaViewModel> Linea { get; set; } 
        public List<ResponseRolDTO> RolesUsuarioList { get; set; }

    }
}