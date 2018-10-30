using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class SeguimientoAcuerdoComercialLocalDTO
    {
        public int CodigoAcuerdoComercialLocal { get; set; }
        public string Estado { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string NroRA { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public string DescripcionEstado { get; set; }
    }
}