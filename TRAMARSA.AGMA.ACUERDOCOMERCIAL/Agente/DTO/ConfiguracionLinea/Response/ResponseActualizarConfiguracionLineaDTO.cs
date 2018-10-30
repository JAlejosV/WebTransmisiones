using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.ConfiguracionLinea.Response
{
    public class ResponseActualizarConfiguracionLineaDTO
    {
        public Result Result { get; set; }
        public ResponseActualizarConfiguracionLineaDTO()
        {
            this.Result = new Result();
        }
    }
}