using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Persona;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Persona
{
    public class ResponseBusquedaPersona
    {
        public List<ListaPersonaDTO> ListaPersona { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }

        public ResponseBusquedaPersona()
        {
            ListaPersona = new List<ListaPersonaDTO>();
            this.Result = new Result();
        }
    }
}