﻿using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestRegistrarTipoContenedor
    {
        public string CodigoLinea { get; set; }
        public string CodigoTipoContenedor { get; set; }
        public string CodigoClaseContenedor { get; set; }
        public string Descripcion { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public bool EstadoRegistro { get; set; }
    }
}