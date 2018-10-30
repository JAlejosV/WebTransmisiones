using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseTipoContenedorViewModel
    {
        public List<TipoContenedorViewModel> TipoContenedorList { get; set; }
        public Result Result { get; set; }
        public int TotalRegistros { get; set; }
        public int NroPagina { get; set; }
        public int CantidadPaginas { get; set; }
        public ResponseTipoContenedorViewModel()
        {
            TipoContenedorList = new List<TipoContenedorViewModel>();
            this.Result = new Result();
        }
    }

}