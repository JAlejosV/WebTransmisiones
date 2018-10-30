using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestActualizarTipoContenedorExternoViewModel
    {
        public string CodigoLinea { get; set; }
        public string CodigoClaseContenedor { get; set; }
        public string CodigoEquivalencia { get; set; }
        public string CodigoTipoContenedor { get; set; }
        public int CodigoTipoContenedorExterno { get; set; }
        public string EstadoRegistro { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public string UsuarioActualizacion { get; set; }
    }
}