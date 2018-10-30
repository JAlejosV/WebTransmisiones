using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Documento;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Documento
{
    public class RequestBusquedaDocumentoViewModel : RequestBaseDTO
    {
        public BusquedaDocumentoViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaDocumentoViewModel()
        {
            filtro = new BusquedaDocumentoViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}