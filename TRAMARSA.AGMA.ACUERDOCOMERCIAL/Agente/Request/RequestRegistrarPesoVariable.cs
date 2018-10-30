using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestRegistrarPesoVariable
    {
        public string Descripcion { get; set; }
        public bool EstadoRegistro { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public int PesoVariable { get; set; }
        public string UsuarioCreacion { get; set; }
        public string CodigoLinea { get; set; }
    }
}