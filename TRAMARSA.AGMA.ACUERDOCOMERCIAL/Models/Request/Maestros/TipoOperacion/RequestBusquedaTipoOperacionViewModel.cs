using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.TipoOperacion
{
    public class RequestBusquedaTipoOperacionViewModel : RequestBaseDTO
    {
        public BusquedaTipoOperacionViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaTipoOperacionViewModel()
        {
            filtro = new BusquedaTipoOperacionViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}