using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.NotificacionIntegracion.Request
{
    public class RequestRegistroNotificacionIntegracionViewModel
    {
        
        public string CodigoLinea { get; set; }
        public string Asunto { get; set; }
        public string Nombre { get; set; }
        public string Destinatario { get; set; }
        public string ConCopia { get; set; }
        public string DetalleCorreo { get; set; }
        public string UsuarioCreacion{ get; set; }
        public DateTime? FechaHoraCreacion{ get; set; }
        
    }
}