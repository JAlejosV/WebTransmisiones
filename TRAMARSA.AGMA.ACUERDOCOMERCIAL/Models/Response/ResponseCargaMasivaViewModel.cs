using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseCargaMasivaViewModel
    {
        public List<RAPTResultDTO> ListaNoIngresado { get; set; }
        public int TotalProcesados { get; set; }
        public int TotalNoProcesados { get; set; }
        public string MensajeResultado { get; set; }
        public Result Result { get; set; }
        public ResponseCargaMasivaViewModel()
        {
            this.Result = new Result();
        }
    }
}