using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Contenedor
{
    public class RequestBusquedaContenedorViewModel : RequestBaseDTO
    {
        public BusquedaContenedorViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaContenedorViewModel()
        {
            filtro = new BusquedaContenedorViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}