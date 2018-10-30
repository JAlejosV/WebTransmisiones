using GR.Comun.DTO;
namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseEliminarTipoContenedor
    {
        public Result Result { get; set; }
        public ResponseEliminarTipoContenedor()
        {
            this.Result = new Result();
        }
    }
}