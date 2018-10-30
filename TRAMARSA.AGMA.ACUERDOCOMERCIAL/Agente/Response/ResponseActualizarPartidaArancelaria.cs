using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseActualizarPartidaArancelaria
    {
        public Result Result { get; set; }
        public ResponseActualizarPartidaArancelaria()
        {
            this.Result = new Result();
        }
    }
}