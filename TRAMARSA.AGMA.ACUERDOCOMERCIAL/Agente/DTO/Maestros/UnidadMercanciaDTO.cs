using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros
{
    public class UnidadMercanciaDTO
    {
        public Int64? CodigoUnidadMercancia { get; set; }
        public string CodigoUnidadMercanciaSunat { get; set; }
        public string NombreUnidadMercancia { get; set; }
        public string CodigoAduanaUnidadMercancia { get; set; }
        public bool EstadoRegistro { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
    }
}