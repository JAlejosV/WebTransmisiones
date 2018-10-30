using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseRegistrarTarifaLocalViewModel
    {
        public Result Result { get; set; }
        public ResponseRegistrarTarifaLocalViewModel()
        {
            this.Result = new Result();
        }
    }
}