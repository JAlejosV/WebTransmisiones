using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.CondicionContrato
{
    public class ResponseCondicionesContratoBL
    {
        public List<ListaCondicionesContratoDTO> ListaCondicionesContrato { get; set; }
        public Result Result { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public ResponseListarCondicionesContrato()
        {
            ListaCondicionesContrato = new List<ListaCondicionesContratoDTO>();
            this.Result = new Result();
        }
    }
}