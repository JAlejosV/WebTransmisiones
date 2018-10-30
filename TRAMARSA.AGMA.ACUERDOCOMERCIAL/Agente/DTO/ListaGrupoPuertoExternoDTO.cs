using System;
namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ListaGrupoPuertoExternoDTO
    {
        public string CodigoLinea { get; set; }
        public string Linea { get; set; }
        public int CodigoGrupoPuerto { get; set; }
        public string NombreGrupoPuerto { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public bool EstadoRegistro { get; set; }
    }
}