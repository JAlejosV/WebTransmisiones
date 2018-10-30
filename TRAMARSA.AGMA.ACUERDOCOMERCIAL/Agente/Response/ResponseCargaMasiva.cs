using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseCargaMasiva
    {
        public List<RAPTResultDTO> RAPTIngresadosList { get; set; }
        public List<RAPTResultDTO> RAPTNOIngresadosList { get; set; }
        public Result Result { get; set; }
        public ResponseCargaMasiva()
        {
            this.Result = new Result();
        }
    }
}