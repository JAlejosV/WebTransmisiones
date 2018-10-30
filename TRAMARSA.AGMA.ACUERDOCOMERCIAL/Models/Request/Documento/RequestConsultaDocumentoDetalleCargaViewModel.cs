using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Documento
{
    public class RequestConsultaDocumentoDetalleCargaViewModel: RequestBaseDTO
    {
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestConsultaDocumentoDetalleCargaViewModel()
        {
            paginacionDTO = new PaginacionDTO();
        }
    }
}