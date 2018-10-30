using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoTransmision
{
    public class ResponseListarTiposTransmisionNave
    {
        public List<ListaTiposTransmisionNaveDTO> ListaTiposTransmisionNave { get; set; }
        public Result Result { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public ResponseListarTiposTransmisionNave()
        {
            ListaTiposTransmisionNave = new List<ListaTiposTransmisionNaveDTO>();
            this.Result = new Result();
        }
    }
}