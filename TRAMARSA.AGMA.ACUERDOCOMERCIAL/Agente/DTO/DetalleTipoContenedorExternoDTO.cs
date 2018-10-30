using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class DetalleTipoContenedorExternoDTO
    {
        public string CodigoClaseContenedor { get; set; }
        public string CodigoTipoContenedor { get; set; }
        public string CodigoLinea { get; set; }
        public int CodigoTipoContenedorExterno { get; set; }
        public int CodigoTipoContenedorExternoDetalle { get; set; }
        public bool EstadoRegistro { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public string Accion { get; set; }
    }
}