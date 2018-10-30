using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseConsultaNoProcesadosViewModel
    {
        public List<RAPTResultDTO> ListaNoIngresado { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }
        public ResponseConsultaNoProcesadosViewModel()
        {
            ListaNoIngresado = new List<RAPTResultDTO>();
            Result = new Result();
        }
    }
}