using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseConsultarDetalleAcuerdoComercialLocalViewModel
    {
        public List<DetalleAcuerdoComercialLocalViewModel> DetalleAcuerdoComercialLocalList { get; set; }
        public Result Result { get; set; }
        public ResponseConsultarDetalleAcuerdoComercialLocalViewModel()
        {
            DetalleAcuerdoComercialLocalList = new List<DetalleAcuerdoComercialLocalViewModel>();
            this.Result = new Result();
        }
    }
}