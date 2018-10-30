using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros
{
    public class NumeroIMODTO
    {
        public Int64? CodigoNumeroIMO { get; set; }
        public Int64? CodigoClaseIMO { get; set; }
        public string NumberIMO { get; set; }
        public string NombreNumeroIMO { get; set; }
        public Int32? PaginaNumeroIMO { get; set; }
        public string NombreClaseIMO { get; set; }
        public bool EstadoRegistro { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
    }
}