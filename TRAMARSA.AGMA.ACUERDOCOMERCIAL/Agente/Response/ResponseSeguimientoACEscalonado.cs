using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseSeguimientoACEscalonado
    {
        public List<SeguimientoAcuerdoComercialEscalonadoDTO> SeguimientoAcuerdoComercialEscalonadoList { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }
        public ResponseSeguimientoACEscalonado()
        {
            SeguimientoAcuerdoComercialEscalonadoList = new List<SeguimientoAcuerdoComercialEscalonadoDTO>();
            Result = new Result();
        }
    }
}