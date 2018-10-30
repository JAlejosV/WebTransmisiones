using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.NotificacionIntegracion.Request
{
    public class RegistroNotificacionIntegracionRequestDTO
    {
        
        public string CodigoLinea { get; set; }
        public string Asunto { get; set; }
        public string Nombre { get; set; }
        public string Destinatario { get; set; }
        public string ConCopia { get; set; }
        public string Cuerpo { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        
    }
}