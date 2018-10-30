using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseRegistrarAcuerdoComercialEscalonado
    {
        public Result Result { get; set; }
        public int CodigoAcuerdoComercialEscalonado { get; set; }
        public ResponseRegistrarAcuerdoComercialEscalonado()
        {
            this.Result = new Result();
        }
    }
}