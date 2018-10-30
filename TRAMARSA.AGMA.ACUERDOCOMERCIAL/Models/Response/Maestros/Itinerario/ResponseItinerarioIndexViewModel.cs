﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Maestros.Itinerario
{
    public class ResponseItinerarioIndexViewModel
    {
        public List<ListaTiposOperacionViewModel> TiposOperacion { get; set; }
        public string FechaDefault { get; set; }
        public string FechaFinDefault { get; set; }
    }
}