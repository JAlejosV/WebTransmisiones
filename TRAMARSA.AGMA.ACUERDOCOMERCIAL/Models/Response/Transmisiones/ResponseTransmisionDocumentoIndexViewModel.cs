﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Transmisiones
{
    public class ResponseTransmisionDocumentoIndexViewModel
    {
        public List<ListaTiposEnvioViewModel> TiposEnvio { get; set; }
        public string FechaDefault { get; set; }
        public string FechaFinDefault { get; set; }
    }
}