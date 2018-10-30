using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.TipoDocumento
{
    public class RequestBusquedaTipoDocumentoViewModel : RequestBaseDTO
    {
        public BusquedaTipoDocumentoViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaTipoDocumentoViewModel()
        {
            filtro = new BusquedaTipoDocumentoViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}