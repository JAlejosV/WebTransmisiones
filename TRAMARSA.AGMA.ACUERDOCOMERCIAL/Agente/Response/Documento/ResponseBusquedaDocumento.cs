using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Documento;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Documento
{
    public class ResponseBusquedaDocumento
    {
        public List<ListaDocumentoDTO> ListaDocumento { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }

        public ResponseBusquedaDocumento()
        {
            ListaDocumento = new List<ListaDocumentoDTO>();
            this.Result = new Result();
        }
    }
}