using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ConsultaDetalleNotificacionViewModel
    {
        public int CodigoNotificacion { get; set; }
        public string CodigoLinea { get; set; }
        public string FechaHoraEjecucion { get; set; }
        public string HoraEjecucion { get; set; }
        public int Frecuencia { get; set; }
        public string CodigoTipoFrecuencia { get; set; }
        public string Asunto { get; set; }
        public string Nombre { get; set; }
        public string DetalleCorreo { get; set; }
        public string UsuarioCreacion { get; set; }
        public string FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string FechaHoraActualizacion { get; set; }
        public bool EstadoRegistro { get; set; }
    }
}