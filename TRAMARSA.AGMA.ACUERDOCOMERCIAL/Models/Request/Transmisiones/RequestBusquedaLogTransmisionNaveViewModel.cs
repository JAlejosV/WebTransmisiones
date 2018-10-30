using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Transmisiones;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Transmisiones
{
    public class RequestBusquedaLogTransmisionNaveViewModel : RequestBaseDTO
    {
        public BusquedaLogTransmisionNaveViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaLogTransmisionNaveViewModel()
        {
            filtro = new BusquedaLogTransmisionNaveViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}