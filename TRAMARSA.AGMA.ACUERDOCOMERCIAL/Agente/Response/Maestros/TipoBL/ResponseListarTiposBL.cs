using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TiposBL
{
    public class ResponseListarTiposBL
    {
        public List<ListaTiposBLDTO> ListaTiposBL { get; set; }
        public Result Result { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public ResponseListarTiposBL()
        {
            ListaTiposBL = new List<ListaTiposBLDTO>();
            this.Result = new Result();
        }
    }
}