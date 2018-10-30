using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoEnvio
{
    public class ResponseBusquedaTipoEnvio
    {
        public List<TipoEnvioDTO> ListaTipoEnvio { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }

        public ResponseBusquedaTipoEnvio()
        {
            ListaTipoEnvio = new List<TipoEnvioDTO>();
            Result = new Result();
        }
    }
}