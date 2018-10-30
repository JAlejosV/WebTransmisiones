using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseConsultarPesoVariable
    {
        public List<PesoVariableDTO> PesoVariableList { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }
        public ResponseConsultarPesoVariable()
        {
            PesoVariableList = new List<PesoVariableDTO>();
            this.Result = new Result();
        }
    }
}