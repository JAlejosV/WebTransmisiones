using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.NotificacionIntegracion
{
    public class ListaBandejaNotificacionIntegracionDTO
    {
        public int CodigoNotificacion { get; set; }
        public string CodigoLinea { get; set; }
        public string DescripcionLinea { get; set; }
        public string Asunto { get; set; }
        public string Nombre { get; set; }
        public string Destinatario { get; set; }
        public string ConCopia { get; set; }
        public string Cuerpo { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public string CodigoEstado { get; set; }
        public string DescripcionEstado { get; set; }
    }
}