using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestActualizarTipoContenedorExterno
    {
        public string CodigoLinea { get; set; }
        public string CodigoClaseContenedor { get; set; }
        public string CodigoEquivalencia { get; set; }
        public string CodigoTipoContenedor { get; set; }
        public int CodigoTipoContenedorExterno { get; set; }
        public bool EstadoRegistro { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public string UsuarioActualizacion { get; set; }
    }
}