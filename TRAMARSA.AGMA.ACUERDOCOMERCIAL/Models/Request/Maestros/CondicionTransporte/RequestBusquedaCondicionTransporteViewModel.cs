using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.CondicionTransporte
{
    public class RequestBusquedaCondicionTransporteViewModel : RequestBaseDTO
    {
        public BusquedaCondicionTransporteViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaCondicionTransporteViewModel()
        {
            filtro = new BusquedaCondicionTransporteViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}