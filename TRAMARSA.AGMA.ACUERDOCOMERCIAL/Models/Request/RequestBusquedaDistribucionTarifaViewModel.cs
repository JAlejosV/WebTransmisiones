﻿using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestBusquedaDistribucionTarifaViewModel : RequestBaseDTO
    {
        public BusquedaDistribucionTarifaViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaDistribucionTarifaViewModel()
        {
            filtro = new BusquedaDistribucionTarifaViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}