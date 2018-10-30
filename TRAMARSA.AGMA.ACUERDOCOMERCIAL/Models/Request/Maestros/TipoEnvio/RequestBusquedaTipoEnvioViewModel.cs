using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.TipoEnvio
{
    public class RequestBusquedaTipoEnvioViewModel : RequestBaseDTO
    {
        public BusquedaTipoEnvioViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaTipoEnvioViewModel()
        {
            filtro = new BusquedaTipoEnvioViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}