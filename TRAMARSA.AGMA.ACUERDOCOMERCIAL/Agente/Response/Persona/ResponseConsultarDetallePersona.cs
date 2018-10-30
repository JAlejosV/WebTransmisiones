using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Persona;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Persona
{
    public class ResponseConsultarDetallePersona
    {
        public List<DetallePersonaDTO> ListaDetallePersona { get; set; }
        public Result Result { get; set; }
        public ResponseConsultarDetallePersona()
        {
            ListaDetallePersona = new List<DetallePersonaDTO>();
            this.Result = new Result();
        }
    }
}