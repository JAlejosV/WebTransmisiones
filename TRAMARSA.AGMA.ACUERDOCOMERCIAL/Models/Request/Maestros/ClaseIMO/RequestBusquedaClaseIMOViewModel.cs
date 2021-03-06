﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.ClaseIMO
{
    public class RequestBusquedaClaseIMOViewModel : RequestBaseDTO
    {
        public BusquedaClaseIMOViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaClaseIMOViewModel()
        {
            filtro = new BusquedaClaseIMOViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}