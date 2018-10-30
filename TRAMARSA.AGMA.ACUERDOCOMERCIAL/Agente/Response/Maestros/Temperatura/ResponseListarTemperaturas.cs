using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.Temperatura
{
    public class ResponseListarTemperaturas
    {
        public List<ListaTemperaturasDTO> ListaTemperaturas { get; set; }
        public Result Result { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public ResponseListarTemperaturas()
        {
            ListaTemperaturas = new List<ListaTemperaturasDTO>();
            this.Result = new Result();
        }
    }
}