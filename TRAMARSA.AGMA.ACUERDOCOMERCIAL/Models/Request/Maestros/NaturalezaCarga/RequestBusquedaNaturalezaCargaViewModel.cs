using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.NaturalezaCarga
{
    public class RequestBusquedaNaturalezaCargaViewModel : RequestBaseDTO
    {
        public BusquedaNaturalezaCargaViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaNaturalezaCargaViewModel()
        {
            filtro = new BusquedaNaturalezaCargaViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}