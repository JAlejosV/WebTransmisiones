using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseActualizarTarifaLocal
    {
         public Result Result { get; set; }
         public ResponseActualizarTarifaLocal()
        {
            this.Result = new Result();
        }
    }
}