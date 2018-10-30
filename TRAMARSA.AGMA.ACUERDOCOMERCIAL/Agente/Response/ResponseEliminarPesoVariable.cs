using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseEliminarPesoVariable
    {
        public Result Result { get; set; }
        public ResponseEliminarPesoVariable()
        {
            this.Result = new Result();
        }
    }
}