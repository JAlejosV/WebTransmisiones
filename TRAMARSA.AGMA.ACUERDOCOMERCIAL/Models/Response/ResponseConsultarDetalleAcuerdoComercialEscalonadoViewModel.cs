using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseConsultarDetalleAcuerdoComercialEscalonadoViewModel
    {
        public List<DetalleAcuerdoComercialEscalonadoViewModel> DetalleAcuerdoComercialEscalonadoList { get; set; }
        public Result Result { get; set; }
        public ResponseConsultarDetalleAcuerdoComercialEscalonadoViewModel()
        {
            DetalleAcuerdoComercialEscalonadoList = new List<DetalleAcuerdoComercialEscalonadoViewModel>();
            this.Result = new Result();
        }
    }
}