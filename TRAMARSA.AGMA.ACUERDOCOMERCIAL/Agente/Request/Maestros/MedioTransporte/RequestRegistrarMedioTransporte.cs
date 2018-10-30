﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.MedioTransporte
{
    public class RequestRegistrarMedioTransporte
    {
        public Int64? CodigoMedioTransporte { get; set; }
        public Byte? CodigoMedioTransporteSunat { get; set; }
        public string NombreMedioTransporte { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}