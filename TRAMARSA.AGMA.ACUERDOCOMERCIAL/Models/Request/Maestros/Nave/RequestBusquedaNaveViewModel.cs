using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Nave
{
    public class RequestBusquedaNaveViewModel : RequestBaseDTO
    {
        public BusquedaNaveViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaNaveViewModel()
        {
            filtro = new BusquedaNaveViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}