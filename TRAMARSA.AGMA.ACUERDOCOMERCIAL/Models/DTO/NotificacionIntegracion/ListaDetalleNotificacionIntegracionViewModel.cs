using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.NotificacionIntegracion
{
    public class ListaDetalleNotificacionIntegracionViewModel
    {
        public int CodigoNotificacion { get; set; }
        public string CodigoLinea { get; set; }
        public string Asunto { get; set; }
        public string Nombre { get; set; }
        public string Destinatario { get; set; }
        public string ConCopia { get; set; }
        public string DetalleCorreo { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string FechaHoraActualizacion { get; set; }
        public bool EstadoRegistro { get; set; }
    }
}