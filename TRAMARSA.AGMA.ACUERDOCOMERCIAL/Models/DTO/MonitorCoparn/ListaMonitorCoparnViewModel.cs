using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.MonitorCoparn
{
    public class ListaMonitorCoparnViewModel
    {
        public int Id { get; set; }
        public string Voyage { get; set; }
        public string Contenedor { get; set; }
        public string CodigoDeposito { get; set; }
        public string DescripcionDeposito { get; set; }
        public string FechaProceso { get; set; }
        public string CodigoEstado { get; set; }
        public string DescripcionEstado { get; set; }
        public string Observacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public string FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string FechaHoraActualizacion { get; set; }
    }
}