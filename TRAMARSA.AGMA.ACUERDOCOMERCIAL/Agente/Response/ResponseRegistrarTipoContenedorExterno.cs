using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseRegistrarTipoContenedorExterno
    {
        public Result Result { get; set; }
        public ResponseRegistrarTipoContenedorExterno()
        {
            this.Result = new Result();
        }
    }
}