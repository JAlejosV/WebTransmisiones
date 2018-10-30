using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class PesoVariableDTO
    {
        public int CodigoVariable { get; set; }
        public string Descripcion { get; set; }
        public bool EstadoRegistro { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public int PesoVariable { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public string CodigoLinea { get; set; }
        public string Linea { get; set; }
    }
}