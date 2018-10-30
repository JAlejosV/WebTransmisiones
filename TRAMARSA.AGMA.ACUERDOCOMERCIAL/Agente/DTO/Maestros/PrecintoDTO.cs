using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros
{
    public class PrecintoDTO
    {
        public Int64? CodigoPrecinto { get; set; }
        public Int64? CodigoCondicionPrecinto { get; set; }
        public Int64? CodigoEntidadPrecinto { get; set; }
        public string NumeroPrecinto { get; set; }
        public string NombreCondicionPrecinto { get; set; }
        public string NombreEntidadPrecinto { get; set; }
        public bool EstadoRegistro { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
    }
}