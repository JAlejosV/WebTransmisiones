using System;
using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseConsultarDetalleTarifaLocal
    {
        public List<DetalleTarifaLocalDTO> DetalleTarifaLocalList { get; set; }
        public Result Result { get; set; }
        public ResponseConsultarDetalleTarifaLocal()
        {
            DetalleTarifaLocalList = new List<DetalleTarifaLocalDTO>();
            this.Result = new Result();
        }
    }
}