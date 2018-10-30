﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.CondicionContrato
{
    public class RequestBusquedaCondicionContratoViewModel : RequestBaseDTO
    {
        public BusquedaCondicionContratoViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaCondicionContratoViewModel()
        {
            filtro = new BusquedaCondicionContratoViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}