using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseConsultaHistorialACLocalViewModel
    {
        public List<AcuerdoComercialHistorialViewModel> AcuerdoComercialLocalHistorialList { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }
        public ResponseConsultaHistorialACLocalViewModel()
        {
            AcuerdoComercialLocalHistorialList = new List<AcuerdoComercialHistorialViewModel>();
            this.Result = new Result();
        }
    }
}