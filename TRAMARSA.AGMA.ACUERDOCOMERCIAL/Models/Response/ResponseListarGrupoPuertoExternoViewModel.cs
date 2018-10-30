using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseListarGrupoPuertoExternoViewModel
    {
        public List<ListaGrupoPuertoExternoViewModel> GrupoPuertoExternoList { get; set; }
        public Result Result { get; set; }
        public int TotalRegistros { get; set; }
        public int NroPagina { get; set; }
        public int CantidadPaginas { get; set; }
        public ResponseListarGrupoPuertoExternoViewModel()
        {
            GrupoPuertoExternoList = new List<ListaGrupoPuertoExternoViewModel>();
            this.Result = new Result();
        }
    }
}