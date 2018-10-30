using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.DTO.AcuerdosComerciales;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseConsultarDetalleAcuerdoComercialLocal
    {
        public List<DetalleAcuerdoComercialLocalDTO> DetalleAcuerdoComercialLocalList { get; set; }
        public Result Result { get; set; }
        public ResponseConsultarDetalleAcuerdoComercialLocal()
        {
            DetalleAcuerdoComercialLocalList = new List<DetalleAcuerdoComercialLocalDTO>();
            this.Result = new Result();
        }
    }
}