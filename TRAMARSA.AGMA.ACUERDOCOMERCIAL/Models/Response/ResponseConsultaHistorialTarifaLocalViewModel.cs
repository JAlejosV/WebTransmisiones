using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseConsultaHistorialTarifaLocalViewModel
    {
        public List<TarifaLocalHistorialViewModel> TarifaLocalHistorialList { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }
        public ResponseConsultaHistorialTarifaLocalViewModel()
        {
            TarifaLocalHistorialList = new List<TarifaLocalHistorialViewModel>();
            this.Result = new Result();
        }

    }
}