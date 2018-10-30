using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ActualizarDetalleGrupoPuertoExternoViewModel
    {
        public int? CodigoGrupoPuerto { get; set; }
        public string CodigoPuerto { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string EstadoRegistro { get; set; }
        public string Accion { get; set; }
    }
}