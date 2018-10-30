using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class TarifaLocalHistorialViewModel
    {
        public int CodigoTarifaLocalHistorial { get; set; }
        public int CodigoTarifaLocal { get; set; }
        public string Usuario { get; set; }
        public string FechaHora { get; set; }
        public string Accion { get; set; }
        public string Descripcion { get; set; }
    }
}