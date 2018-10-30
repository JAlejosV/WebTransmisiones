using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.NumeroIMO
{
    public class RequestBusquedaNumeroIMOViewModel : RequestBaseDTO
    {
        public BusquedaNumeroIMOViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaNumeroIMOViewModel()
        {
            filtro = new BusquedaNumeroIMOViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}