using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.PersonaxRol
{
    public class RequestBusquedaPersonaxRolViewModel : RequestBaseDTO
    {
        public BusquedaPersonaxRolViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaPersonaxRolViewModel()
        {
            filtro = new BusquedaPersonaxRolViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}