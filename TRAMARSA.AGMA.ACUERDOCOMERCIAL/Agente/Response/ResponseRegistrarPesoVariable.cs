using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseRegistrarPesoVariable
    {
        public Result Result { get; set; }
        public ResponseRegistrarPesoVariable()
        {
            this.Result = new Result();
        }
    }
}