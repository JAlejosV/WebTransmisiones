using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Transmisiones;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Transmisiones
{
    public class RequestBusquedaLogTransmisionDocumentoViewModel : RequestBaseDTO
    {
        public BusquedaLogTransmisionDocumentoViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestBusquedaLogTransmisionDocumentoViewModel()
        {
            filtro = new BusquedaLogTransmisionDocumentoViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }
}