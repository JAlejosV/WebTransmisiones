using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestActualizarPesoVariable
    {
        public int CodigoVariable { get; set; }
        public string Descripcion { get; set; }
        public bool EstadoRegistro { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public int PesoVariable { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string CodigoLinea { get; set; }
    }
}