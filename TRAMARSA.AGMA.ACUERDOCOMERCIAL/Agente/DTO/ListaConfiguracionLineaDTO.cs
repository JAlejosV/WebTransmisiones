using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ListaConfiguracionLineaDTO
    {
        public int? CodigoConfiguracion { get; set; }
        public string CodigoLinea { get; set; }
        public string DescripcionLinea { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public bool EstadoRegistro { get; set; }
        public string DescripcionEstado { get; set; }
    }
}