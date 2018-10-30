using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestBusquedaPaisViewModel : RequestBaseDTO
    {
        public BusquedaPaisViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaPaisViewModel()
        {
            filtro = new BusquedaPaisViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}