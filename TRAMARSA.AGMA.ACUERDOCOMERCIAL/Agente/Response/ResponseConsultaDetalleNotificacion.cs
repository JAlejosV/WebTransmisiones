using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseConsultaDetalleNotificacion
    {
        public List<BlNotificacionDTO> DetalleBlNotificacionList { get; set; }
        public Result Result { get; set; }
        public ResponseConsultaDetalleNotificacion()
        {
            this.Result = new Result();
            this.DetalleBlNotificacionList = new List<BlNotificacionDTO>();
        }
    }
}