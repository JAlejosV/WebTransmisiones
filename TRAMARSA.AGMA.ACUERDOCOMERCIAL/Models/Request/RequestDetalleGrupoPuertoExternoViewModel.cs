using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestDetalleGrupoPuertoExternoViewModel
    {
        public int CodigoGrupoPuertoDetalle { get; set; }
        public int CodigoGrupoPuerto { get; set; }
        public string CodigoPuerto { get; set; }
        public string UsuarioCreacion { get; set; }
        public string EstadoRegistro { get; set; }
        public string Accion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        //public DateTime? FechaHoraActualizacion { get; set; }
        //public string UsuarioActualizacion { get; set; }
    }
}