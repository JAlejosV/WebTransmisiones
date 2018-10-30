using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Precinto
{
    public class RequestBusquedaPrecintoViewModel : RequestBaseDTO
    {
        public BusquedaPrecintoViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaPrecintoViewModel()
        {
            filtro = new BusquedaPrecintoViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}