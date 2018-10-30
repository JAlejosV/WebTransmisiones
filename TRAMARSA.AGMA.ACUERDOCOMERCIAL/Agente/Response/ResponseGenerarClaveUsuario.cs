using GR.Comun.DTO;
namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseGenerarClaveUsuario
    {
        public Result Result { get; set; }
        public ResponseGenerarClaveUsuario()
        {
            this.Result = new Result();
        }
    }
}