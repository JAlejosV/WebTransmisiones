﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestActualizarNotificacion
    {
        public int CodigoNotificacion { get; set; }
        public string CodigoLinea { get; set; }
        public DateTime? FechaHoraEjecucion { get; set; }
        public int Frecuencia { get; set; }
        public string CodigoTipoFrecuencia { get; set; }
        public string Asunto { get; set; }
        public string Nombre { get; set; }
        public string DetalleCorreo { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public bool EstadoRegistro { get; set; }
    }
}