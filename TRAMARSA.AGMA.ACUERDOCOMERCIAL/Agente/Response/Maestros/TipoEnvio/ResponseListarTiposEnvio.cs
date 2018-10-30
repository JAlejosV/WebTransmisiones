using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoEnvio
{
    public class ResponseListarTiposEnvio
    {
        public List<ListaTiposEnvioDTO> ListaTiposEnvio { get; set; }
        public Result Result { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public ResponseListarTiposEnvio()
        {
            ListaTiposEnvio = new List<ListaTiposEnvioDTO>();
            this.Result = new Result();
        }
    }
}