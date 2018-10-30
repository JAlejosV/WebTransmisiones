using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseReporteContenedorNoDevueltoViewModel
    {
        public List<ReporteContenedorNoDevueltoViewModel> LiquidacionesNoDevueltas { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }
        public ResponseReporteContenedorNoDevueltoViewModel()
        {
            LiquidacionesNoDevueltas = new List<ReporteContenedorNoDevueltoViewModel>();
            this.Result = new Result();
        }
    }
}