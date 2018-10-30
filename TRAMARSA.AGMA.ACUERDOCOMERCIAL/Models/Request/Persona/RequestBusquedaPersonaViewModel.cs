using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Persona;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Persona
{
    public class RequestBusquedaPersonaViewModel : RequestBaseDTO
    {
        public BusquedaPersonaViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaPersonaViewModel()
        {
            filtro = new BusquedaPersonaViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}