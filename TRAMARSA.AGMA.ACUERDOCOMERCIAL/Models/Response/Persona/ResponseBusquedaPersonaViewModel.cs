using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Persona;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Persona
{
    public class ResponseBusquedaPersonaViewModel
    {
        public List<ListaPersonaViewModel> ListaPersona { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }
        public ResponseBusquedaPersonaViewModel()
        {
            ListaPersona = new List<ListaPersonaViewModel>();
            this.Result = new Result();
        }
    }
}