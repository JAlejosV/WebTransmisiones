using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ResponseRegistrarTarifaLocal
    {
        public Result Result { get; set; }
        public int CodigoAcuerdoComercialLocal { get; set; }
        public ResponseRegistrarTarifaLocal()
        {
            this.Result = new Result();
        }
    }
}