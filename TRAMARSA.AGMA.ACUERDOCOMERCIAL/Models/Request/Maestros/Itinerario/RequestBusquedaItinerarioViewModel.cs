using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Itinerario
{
    public class RequestBusquedaItinerarioViewModel : RequestBaseDTO
    {
        public BusquedaItinerarioViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaItinerarioViewModel()
        {
            filtro = new BusquedaItinerarioViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}