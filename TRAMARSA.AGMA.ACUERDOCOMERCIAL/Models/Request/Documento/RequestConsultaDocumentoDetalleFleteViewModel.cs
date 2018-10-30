using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Documento
{
    public class RequestConsultaDocumentoDetalleFleteViewModel : RequestBaseDTO
    {
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestConsultaDocumentoDetalleFleteViewModel()
        {
            paginacionDTO = new PaginacionDTO();
        }
    }
}