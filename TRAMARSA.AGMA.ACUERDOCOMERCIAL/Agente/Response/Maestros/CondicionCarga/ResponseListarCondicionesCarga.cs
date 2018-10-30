using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.CondicionCarga
{
    public class ResponseListarCondicionesCarga
    {
        public List<ListaCondicionesCargaDTO> ListaCondicionesCarga { get; set; }
        public Result Result { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public ResponseListarCondicionesCarga()
        {
            ListaCondicionesCarga = new List<ListaCondicionesCargaDTO>();
            this.Result = new Result();
        }
    }
}