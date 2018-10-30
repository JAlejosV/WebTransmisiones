using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Documento;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Documento
{
    public class ResponseConsultarDetalleDocumentoViewModel
    {
        public List<DetalleDocumentoViewModel> ListaDetalleDocumento { get; set; }
        public Result Result { get; set; }
        public ResponseConsultarDetalleDocumentoViewModel()
        {
            ListaDetalleDocumento = new List<DetalleDocumentoViewModel>();
            this.Result = new Result();
        }
    }
}