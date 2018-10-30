using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseModificarDetalleGrupoPuertoExterno
    {
        public Result Result { get; set; }
        public ResponseModificarDetalleGrupoPuertoExterno()
        {
            this.Result = new Result();
        }
    }
}