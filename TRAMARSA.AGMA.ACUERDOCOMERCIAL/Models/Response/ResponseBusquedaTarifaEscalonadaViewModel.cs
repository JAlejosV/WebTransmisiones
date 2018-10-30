using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseBusquedaTarifaEscalonadaViewModel
    {
         public List<ListaTarifaEscalonadaViewModel> TarifaEscalonadaList { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }
        public ResponseBusquedaTarifaEscalonadaViewModel()
        {
            TarifaEscalonadaList = new List<ListaTarifaEscalonadaViewModel>();
            this.Result = new Result();
        }
    }
}