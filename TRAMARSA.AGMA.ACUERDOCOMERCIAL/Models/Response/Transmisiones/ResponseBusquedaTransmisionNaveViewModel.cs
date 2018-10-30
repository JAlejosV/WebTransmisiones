using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Transmisiones;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Transmisiones
{
    public class ResponseBusquedaTransmisionNaveViewModel
    {
        public List<ListaTransmisionNaveViewModel> ListaTransmisionNave { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }
        public ResponseBusquedaTransmisionNaveViewModel()
        {
            ListaTransmisionNave = new List<ListaTransmisionNaveViewModel>();
            this.Result = new Result();
        }
    }
}