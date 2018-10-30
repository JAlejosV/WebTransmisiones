using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ListaParametroNegocioDTO
    {
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public bool EstadoRegistro { get; set; }
        public DateTime FechaHoraActualizacion { get; set; }
        public DateTime FechaHoraCreacion { get; set; }
        public int IdParametroNegocio { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public string Valor { get; set; }
        public string ValorRelacionado { get; set; }
    }
}