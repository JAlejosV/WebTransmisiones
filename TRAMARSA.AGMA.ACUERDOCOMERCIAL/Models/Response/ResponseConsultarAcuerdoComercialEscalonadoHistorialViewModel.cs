using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseConsultarAcuerdoComercialEscalonadoHistorialViewModel
    {
        public List<AcuerdoComercialEscalonadoHistorialViewModel> AcuerdoComercialEscalonadoHistorialList { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }
        public ResponseConsultarAcuerdoComercialEscalonadoHistorialViewModel()
        {
            AcuerdoComercialEscalonadoHistorialList = new List<AcuerdoComercialEscalonadoHistorialViewModel>();
            this.Result = new Result();
        }
    }
}