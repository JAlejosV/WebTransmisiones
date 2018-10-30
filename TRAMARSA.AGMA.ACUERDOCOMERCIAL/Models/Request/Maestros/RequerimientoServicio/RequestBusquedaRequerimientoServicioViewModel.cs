using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.RequerimientoServicio
{
    public class RequestBusquedaRequerimientoServicioViewModel : RequestBaseDTO
    {
        public BusquedaRequerimientoServicioViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaRequerimientoServicioViewModel()
        {
            filtro = new BusquedaRequerimientoServicioViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}