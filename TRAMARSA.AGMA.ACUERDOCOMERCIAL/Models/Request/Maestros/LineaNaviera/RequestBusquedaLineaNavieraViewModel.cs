using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.LineaNaviera
{
    public class RequestBusquedaLineaNavieraViewModel : RequestBaseDTO
    {          
        public BusquedaLineaNavieraViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaLineaNavieraViewModel()
        {
            filtro = new BusquedaLineaNavieraViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}