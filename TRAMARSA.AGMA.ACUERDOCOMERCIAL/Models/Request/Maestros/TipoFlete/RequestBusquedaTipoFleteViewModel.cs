using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.TipoFlete
{
    public class RequestBusquedaTipoFleteViewModel : RequestBaseDTO
    {
        public BusquedaTipoFleteViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaTipoFleteViewModel()
        {
            filtro = new BusquedaTipoFleteViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}