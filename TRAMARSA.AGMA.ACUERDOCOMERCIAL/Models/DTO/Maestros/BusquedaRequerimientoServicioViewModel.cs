﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros
{
    public class BusquedaRequerimientoServicioViewModel
    {
        public Int64? CodigoRequerimientoServicio { get; set; }
        public string CodigoRequerimientoServicioSunat { get; set; }
        public string NombreRequerimientoServicio { get; set; }
    }
}