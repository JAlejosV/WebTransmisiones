using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.CondicionCarga
{
    public class RequestBusquedaCondicionCargaViewModel : RequestBaseDTO
    {
        public BusquedaCondicionCargaViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaCondicionCargaViewModel()
        {
            filtro = new BusquedaCondicionCargaViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}