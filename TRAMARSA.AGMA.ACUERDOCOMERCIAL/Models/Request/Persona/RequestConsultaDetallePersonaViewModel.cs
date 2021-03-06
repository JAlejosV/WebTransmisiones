﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Persona;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Persona
{
    public class RequestConsultaDetallePersonaViewModel : RequestBaseDTO
    {
        public ConsultarDetallePersonaViewModel filtro { get; set; }
        public RequestConsultaDetallePersonaViewModel()
        {
            filtro = new ConsultarDetallePersonaViewModel();
        }
    }
}