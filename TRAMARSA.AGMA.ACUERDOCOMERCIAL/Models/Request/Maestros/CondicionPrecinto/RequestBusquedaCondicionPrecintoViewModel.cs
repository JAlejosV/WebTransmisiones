using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.CondicionPrecinto
{
    public class RequestBusquedaCondicionPrecintoViewModel : RequestBaseDTO
    {
        public BusquedaCondicionPrecintoViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaCondicionPrecintoViewModel()
        {
            filtro = new BusquedaCondicionPrecintoViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}