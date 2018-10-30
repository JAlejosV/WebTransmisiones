using System.Collections.Generic;
using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ResponseListarTerminalPortuario
    {
        public List<ListaTerminalPortuarioDTO> TerminalPortuarioList { get; set; }
        public Result Result { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public ResponseListarTerminalPortuario()
        {
            TerminalPortuarioList = new List<ListaTerminalPortuarioDTO>();
            this.Result = new Result();
        }
    }
}