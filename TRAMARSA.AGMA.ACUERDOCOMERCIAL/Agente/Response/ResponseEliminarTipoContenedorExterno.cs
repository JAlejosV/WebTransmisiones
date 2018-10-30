using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseEliminarTipoContenedorExterno
    {
        public Result Result { get; set; }
        public ResponseEliminarTipoContenedorExterno()
        {
            this.Result = new Result();
        }
    }
}