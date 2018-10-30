using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseBusquedaUsuarioViewModel
    {
        public List<ListaUsuarioViewModel> UsuarioXRecursoValorList { get; set; }
        public Result Result { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public ResponseBusquedaUsuarioViewModel()
        {
            UsuarioXRecursoValorList = new List<ListaUsuarioViewModel>();
            this.Result = new Result();
        }
    }
}