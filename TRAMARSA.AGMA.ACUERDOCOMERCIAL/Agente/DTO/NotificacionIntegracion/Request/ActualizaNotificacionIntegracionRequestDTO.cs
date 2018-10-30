using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.NotificacionIntegracion.Request
{
    public class ActualizaNotificacionIntegracionRequestDTO
    {
        public int CodigoNotificacion { get; set; }
        public string CodigoLinea { get; set; }
        public string Asunto { get; set; }
        public string Nombre { get; set; }
        public string Destinatario { get; set; }
        public string ConCopia { get; set; }
        public string Cuerpo { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public bool EstadoRegistro { get; set; }
    }
}