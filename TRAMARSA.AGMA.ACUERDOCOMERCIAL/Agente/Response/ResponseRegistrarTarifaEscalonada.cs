using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ResponseRegistrarTarifaEscalonada
    {
        public Result Result { get; set; }
        public ResponseRegistrarTarifaEscalonada()
        {
            this.Result = new Result();
        }
    }
}