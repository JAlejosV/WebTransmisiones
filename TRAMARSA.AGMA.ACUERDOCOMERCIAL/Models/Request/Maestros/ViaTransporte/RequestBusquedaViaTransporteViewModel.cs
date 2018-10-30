using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.ViaTransporte
{
    public class RequestBusquedaViaTransporteViewModel : RequestBaseDTO
    {
        public BusquedaViaTransporteViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaViaTransporteViewModel()
        {
            filtro = new BusquedaViaTransporteViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}