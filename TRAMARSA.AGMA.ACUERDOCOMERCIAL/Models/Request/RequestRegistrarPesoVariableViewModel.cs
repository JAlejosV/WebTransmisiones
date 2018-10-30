using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestRegistrarPesoVariableViewModel
    {
        public string CodigoLinea { get; set; }
        public string Descripcion { get; set; }
        public string EstadoRegistro { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public int PesoVariable { get; set; }
        public string UsuarioCreacion { get; set; }
    }
}