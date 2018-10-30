using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseActualizarTipoContenedor
    {
        public Result Result { get; set; }
        public ResponseActualizarTipoContenedor()
        {
            this.Result = new Result();
        }
    }
}