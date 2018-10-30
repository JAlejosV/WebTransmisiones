using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseActualizarTipoContenedorExterno
    {
        public Result Result { get; set; }
        public ResponseActualizarTipoContenedorExterno()
        {
            this.Result = new Result();
        }
    }
}