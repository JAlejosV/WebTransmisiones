﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class PaisDTO
    {
        public Int64 CodigoPais { get; set; }
        public string CodigoPaisSunat { get; set; }
        public string NombrePais { get; set; }
        public string CodigoAlfaPais { get; set; }
        public bool EstadoRegistro { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
    }
}