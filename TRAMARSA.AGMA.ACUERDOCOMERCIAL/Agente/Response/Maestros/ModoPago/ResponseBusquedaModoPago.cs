using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.ModoPago
{
    public class ResponseBusquedaModoPago
    { 
        public List<ModoPagoDTO> ListaModoPago { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }

        public ResponseBusquedaModoPago()
        {
            ListaModoPago = new List<ModoPagoDTO>();
            Result = new Result();
        }
    }
}