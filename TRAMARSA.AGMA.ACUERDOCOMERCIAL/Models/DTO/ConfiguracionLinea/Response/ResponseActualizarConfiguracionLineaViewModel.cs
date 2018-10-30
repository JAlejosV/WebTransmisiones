using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.ConfiguracionLinea;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseActualizarConfiguracionLineaViewModel
    {
        public Result Result { get; set; }
        public ResponseActualizarConfiguracionLineaViewModel()
        {
            this.Result = new Result();
        }
    }
}