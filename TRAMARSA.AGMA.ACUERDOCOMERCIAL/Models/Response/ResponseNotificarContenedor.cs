using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseNotificarContenedor
    {
   
        public Result Result { get; set; }
        public ResponseNotificarContenedor()
        {
            this.Result = new Result();
        }
    }
}