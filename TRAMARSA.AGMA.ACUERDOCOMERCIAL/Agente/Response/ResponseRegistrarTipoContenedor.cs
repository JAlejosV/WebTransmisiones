using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseRegistrarTipoContenedor
    {
        public Result Result { get; set; }
        public ResponseRegistrarTipoContenedor()
        {
            this.Result = new Result();
        }
    }
}