using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Documento;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Documento
{
    public class ResponseBusquedaDocumentoViewModel
    {
        public List<ListaDocumentoViewModel> ListaDocumento { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }
        public ResponseBusquedaDocumentoViewModel()
        {
            ListaDocumento = new List<ListaDocumentoViewModel>();
            this.Result = new Result();
        }
    }
}