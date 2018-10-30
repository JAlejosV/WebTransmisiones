using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseActualizarNotificacion
    {
        public Result Result { get; set; }
        public ResponseActualizarNotificacion()
        {
            this.Result = new Result();
        }
    }
}