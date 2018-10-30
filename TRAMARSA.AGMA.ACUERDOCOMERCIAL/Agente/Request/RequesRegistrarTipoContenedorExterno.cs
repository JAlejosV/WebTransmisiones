using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequesRegistrarTipoContenedorExterno
    {
        public string CodigoLinea { get; set; }
        public string CodigoClaseContenedor { get; set; }
        public string CodigoEquivalencia { get; set; }
        public string CodigoTipoContenedor { get; set; }
        public int CodigoTipoContenedorExterno { get; set; }
        public bool EstadoRegistro { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioCreacion { get; set; }
    }
}