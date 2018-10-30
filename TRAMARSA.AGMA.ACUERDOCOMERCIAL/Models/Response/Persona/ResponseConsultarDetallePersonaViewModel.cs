using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Persona;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Persona
{
    public class ResponseConsultarDetallePersonaViewModel
    {
        public List<DetallePersonaViewModel> ListaDetallePersona { get; set; }
        public Result Result { get; set; }
        public ResponseConsultarDetallePersonaViewModel()
        {
            ListaDetallePersona = new List<DetallePersonaViewModel>();
            this.Result = new Result();
        }
    }
}