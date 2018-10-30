using System;
namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class PartidaArancelariaDTO
    {
        public int IdPartidaArancelaria { get; set; }
        public string CodigoPartidaArancelaria { get; set; }
        public string DescripcionPartidaArancelaria { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
    }
}