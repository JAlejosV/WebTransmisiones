using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.UnidadMercancia
{
    public class RequestBusquedaUnidadMercanciaViewModel : RequestBaseDTO
    {
        public BusquedaUnidadMercanciaViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaUnidadMercanciaViewModel()
        {
            filtro = new BusquedaUnidadMercanciaViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}