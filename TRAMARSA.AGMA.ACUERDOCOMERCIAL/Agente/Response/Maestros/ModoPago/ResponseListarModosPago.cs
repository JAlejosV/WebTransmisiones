using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.ModoPago
{
    public class ResponseListarModosPago
    {
        public List<ListaModosPagoDTO> ListaModosPago { get; set; }
        public Result Result { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public ResponseListarModosPago()
        {
            ListaModosPago = new List<ListaModosPagoDTO>();
            this.Result = new Result();
        }
    }
}