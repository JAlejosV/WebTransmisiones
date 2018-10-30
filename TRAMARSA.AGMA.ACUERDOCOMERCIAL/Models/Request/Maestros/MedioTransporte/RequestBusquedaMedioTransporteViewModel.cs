using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.MedioTransporte
{
    public class RequestBusquedaMedioTransporteViewModel : RequestBaseDTO
    {
        public BusquedaMedioTransporteViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaMedioTransporteViewModel()
        {
            filtro = new BusquedaMedioTransporteViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}