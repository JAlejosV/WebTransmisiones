﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Aduana
{
    public class RequestBusquedaAduanaViewModel : RequestBaseDTO
    {
        public BusquedaAduanaViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaAduanaViewModel()
        {
            filtro = new BusquedaAduanaViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}