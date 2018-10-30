using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.CondicionTransporte
{
    public class ResponseListarCondicionesTransporte
    {
        public List<ListaCondicionesTransporteDTO> ListaCondicionesTransporte { get; set; }
        public Result Result { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public ResponseListarCondicionesTransporte()
        {
            ListaCondicionesTransporte = new List<ListaCondicionesTransporteDTO>();
            this.Result = new Result();
        }
    }
}