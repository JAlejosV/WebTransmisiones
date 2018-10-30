using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.EntidadPrecinto
{
    public class RequestBusquedaEntidadPrecintoViewModel : RequestBaseDTO
    {
        public BusquedaEntidadPrecintoViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaEntidadPrecintoViewModel()
        {
            filtro = new BusquedaEntidadPrecintoViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}