using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Transmisiones;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Transmisiones
{
    public class ResponseBusquedaLogTransmisionNaveViewModel
    {
        public List<ListaLogTransmisionNaveViewModel> ListaLogTransmisionNave { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }
        public ResponseBusquedaLogTransmisionNaveViewModel()
        {
            ListaLogTransmisionNave = new List<ListaLogTransmisionNaveViewModel>();
            this.Result = new Result();
        }
    }
}