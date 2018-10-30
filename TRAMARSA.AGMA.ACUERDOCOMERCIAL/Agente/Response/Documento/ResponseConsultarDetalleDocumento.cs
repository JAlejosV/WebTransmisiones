using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Documento;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Documento
{
    public class ResponseConsultarDetalleDocumento
    {
        public List<DetalleDocumentoDTO> ListaDetalleDocumento { get; set; }
        public Result Result { get; set; }
        public ResponseConsultarDetalleDocumento()
        {
            ListaDetalleDocumento = new List<DetalleDocumentoDTO>();
            this.Result = new Result();
        }
    }
}