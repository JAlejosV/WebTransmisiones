using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseConsultarDetalleAcuerdoComercialEscalonado
    {
        public List<DetalleAcuerdoComercialEscalonadoDTO> DetalleAcuerdoComercialEscalonadoList  { get; set; }
        public Result Result { get; set; }
        public ResponseConsultarDetalleAcuerdoComercialEscalonado()
        {
            DetalleAcuerdoComercialEscalonadoList = new List<DetalleAcuerdoComercialEscalonadoDTO>();
            this.Result = new Result();
        }
    }
}