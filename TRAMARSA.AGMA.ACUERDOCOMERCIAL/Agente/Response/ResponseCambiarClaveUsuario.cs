using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseCambiarClaveUsuario
    {
         public Result Result { get; set; }
         public ResponseCambiarClaveUsuario()
        {
            this.Result = new Result();
        }
    }
}