using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestActualizarPesoVariableViewModel
    {
        public int CodigoVariable { get; set; }
        public string Descripcion { get; set; }
        public string EstadoRegistro { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public int PesoVariable { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string CodigoLinea { get; set; }
    }
}