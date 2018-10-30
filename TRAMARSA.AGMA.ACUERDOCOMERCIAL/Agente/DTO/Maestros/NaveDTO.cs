using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros
{
    public class NaveDTO
    {
        public Int64 CodigoNave { get; set; }
        public Int64 CodigoPais { get; set; }
        public string NombrePais { get; set; }
        public Int64 CodigoTipoNave { get; set; }
        public string NombreTipoNave { get; set; }
        public Int64 CodigoLineaNaviera { get; set; }
        public string NombreLineaNaviera { get; set; }
        public string NombreNave { get; set; }
        public string MatriculaNave { get; set; }
        public Decimal? TrbNave { get; set; }
        public Decimal? TrnNave { get; set; }
        public Decimal? EsloraNave { get; set; }
        public Decimal? MangaNave { get; set; }
        public Decimal? CaladoNave { get; set; }
        public bool EstadoRegistro { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
    }
}