﻿using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestActualizarTipoContenedor
    {
        public string CodigoLinea { get; set; }
        public string CodigoTipoContenedor { get; set; }
        public string CodigoClaseContenedor { get; set; }
        public string Descripcion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public bool EstadoRegistro { get; set; }
    }
}