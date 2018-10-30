using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseActualizarPesoVariable
    {
        public Result Result { get; set; }
        public ResponseActualizarPesoVariable()
        {
            this.Result = new Result();
        }
    }
}