using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoTransmision
{
    public class ResponseListarTiposTransmisionDocumento
    {
        public List<ListaTiposTransmisionDocumentoDTO> ListaTiposTransmisionDocumento { get; set; }
        public Result Result { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public ResponseListarTiposTransmisionDocumento()
        {
            ListaTiposTransmisionDocumento = new List<ListaTiposTransmisionDocumentoDTO>();
            this.Result = new Result();
        }
    }
}