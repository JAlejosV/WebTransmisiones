using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseActualizarGrupoPuertoExterno
    {
        public Result Result { get; set; }
        public ResponseActualizarGrupoPuertoExterno()
        {
            this.Result = new Result();
        }
    }
}