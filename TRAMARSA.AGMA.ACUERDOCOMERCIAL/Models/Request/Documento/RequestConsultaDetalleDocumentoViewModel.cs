using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Documento;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Documento
{
    public class RequestConsultaDetalleDocumentoViewModel : RequestBaseDTO
    {
        public ConsultarDetalleDocumentoViewModel filtro { get; set; }
        public RequestConsultaDetalleDocumentoViewModel()
        {
            filtro = new ConsultarDetalleDocumentoViewModel();
        }
    }
}