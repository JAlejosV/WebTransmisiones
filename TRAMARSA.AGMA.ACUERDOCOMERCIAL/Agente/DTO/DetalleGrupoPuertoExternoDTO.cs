using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class DetalleGrupoPuertoExternoDTO
    {
        public int CodigoGrupoPuertoDetalle { get; set; }
        public int CodigoGrupoPuerto { get; set; }
        public string CodigoPuerto { get; set; }
        public string UsuarioCreacion { get; set; }
        public bool EstadoRegistro { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string Accion { get; set; }
    }
}