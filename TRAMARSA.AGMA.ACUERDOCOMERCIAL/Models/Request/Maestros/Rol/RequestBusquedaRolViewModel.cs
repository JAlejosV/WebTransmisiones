﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Rol
{
    public class RequestBusquedaRolViewModel : RequestBaseDTO
    {
        public BusquedaRolViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaRolViewModel()
        {
            filtro = new BusquedaRolViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}