﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.Puerto
{
    public class RequestRegistrarPuerto
    {
        public Int64? CodigoPuerto { get; set; }
        public Int64? CodigoPais { get; set; }
        public string CodigoPuertoSunat { get; set; }
        public string NombrePuerto { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}