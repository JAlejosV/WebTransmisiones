using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.TipoOperacion
{
    public class ResponseListarTiposOperacion
    {
        public List<ListaTiposOperacionDTO> ListaTiposOperacion { get; set; }
        public Result Result { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public ResponseListarTiposOperacion()
        {
            ListaTiposOperacion = new List<ListaTiposOperacionDTO>();
            this.Result = new Result();
        }
    }
}