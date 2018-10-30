using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseBusquedaACLocalIndexViewModel
    {
        public List<ListaLineaViewModel> Linea { get; set; }
        public List<ListaRolClienteViewModel> Rol { get; set; }
    }
}