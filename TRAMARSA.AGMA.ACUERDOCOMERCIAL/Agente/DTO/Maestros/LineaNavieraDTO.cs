using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros
{
    public class LineaNavieraDTO
    {
        public Int64 CodigoLineaNaviera { get; set; }
        public string NombreLineaNaviera { get; set; }
        public string DireccionLineaNaviera { get; set; }
        public string RucLineaNaviera { get; set; }
        public string CodigoEquivalencia { get; set; }
        public bool EstadoRegistro { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
    }
}