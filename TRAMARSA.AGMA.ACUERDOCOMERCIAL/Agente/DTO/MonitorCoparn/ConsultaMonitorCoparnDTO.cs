using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.MonitorCoparn
{
    public class ConsultaMonitorCoparnDTO
    {
        public int Id { get; set; }
        public string Voyage { get; set; }
        public string Contenedor { get; set; }
        public string Deposito { get; set; }
        public string DescripcionAlmacen { get; set; }
        public DateTime? FechaProceso { get; set; }
        public string CodigoEstado { get; set; }
        public string DescripcionEstado { get; set; }
        public string Observacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
    }
}