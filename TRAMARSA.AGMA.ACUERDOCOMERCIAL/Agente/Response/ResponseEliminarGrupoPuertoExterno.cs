using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseEliminarGrupoPuertoExterno
    {
         public Result Result { get; set; }
         public ResponseEliminarGrupoPuertoExterno()
        {
            this.Result = new Result();
        }
    }
}