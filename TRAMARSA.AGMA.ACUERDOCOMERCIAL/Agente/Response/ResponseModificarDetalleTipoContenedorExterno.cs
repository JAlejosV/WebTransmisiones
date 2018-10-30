using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseModificarDetalleTipoContenedorExterno
    {
        public Result Result { get; set; }
        public ResponseModificarDetalleTipoContenedorExterno()
        {
            this.Result = new Result();
        }
    }
}