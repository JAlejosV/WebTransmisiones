using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.UnidadMercancia
{
    public class ResponseBusquedaUnidadMercancia
    {
        public List<UnidadMercanciaDTO> ListaUnidadMercancia { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }

        public ResponseBusquedaUnidadMercancia()
        {
            ListaUnidadMercancia = new List<UnidadMercanciaDTO>();
            Result = new Result();
        }
    }
}