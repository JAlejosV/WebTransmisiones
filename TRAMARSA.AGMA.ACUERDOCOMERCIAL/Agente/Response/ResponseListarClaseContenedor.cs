using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseListarClaseContenedor
    {
        public List<ClaseContenedorDTO> ClaseContenedorList { get; set; }
        public Result Result { get; set; }
        public ResponseListarClaseContenedor()
        {
            ClaseContenedorList = new List<ClaseContenedorDTO>();
            this.Result = new Result();
        }
    }
}