using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseAgregarGrupoPuertoExterno
    {
        public Result Result { get; set; }
        public ResponseAgregarGrupoPuertoExterno()
        {
            this.Result = new Result();
        }
    }
}