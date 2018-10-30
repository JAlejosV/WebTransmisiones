﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Temperatura
{
    public class RequestBusquedaTemperaturaViewModel  : RequestBaseDTO
    {
        public BusquedaTemperaturaViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaTemperaturaViewModel()
        {
            filtro = new BusquedaTemperaturaViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}