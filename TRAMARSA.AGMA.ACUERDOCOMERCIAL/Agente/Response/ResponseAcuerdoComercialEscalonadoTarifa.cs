using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseAcuerdoComercialEscalonadoTarifa
    {
        public List<AcuerdoComercialEscalonadoTarifaDTO> ListaAcuerdoComercialEscalonadoTarifa  { get; set; }
        public List<TarifaEscalonadaLigadaDTO> TarifaEscalonadaLigadaList { get; set; }
        public Result Result { get; set; }
        public ResponseAcuerdoComercialEscalonadoTarifa()
        {
            TarifaEscalonadaLigadaList = new List<TarifaEscalonadaLigadaDTO>();
            ListaAcuerdoComercialEscalonadoTarifa = new List<AcuerdoComercialEscalonadoTarifaDTO>();
            Result = new Result();
        }
    }
}