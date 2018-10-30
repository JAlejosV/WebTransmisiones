using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Transmisiones;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Transmisiones
{
    public class ResponseBusquedaTransmisionNave
    {
        public List<ListaTransmisionNaveDTO> ListaTransmisionNave { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }

        public ResponseBusquedaTransmisionNave()
        {
            ListaTransmisionNave = new List<ListaTransmisionNaveDTO>();
            this.Result = new Result();
        }
    }
}