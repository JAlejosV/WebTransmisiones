using System.Collections.Generic;
using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ResponseListaDetalleCatalogo
    {
        public List<ListaDetalleCatalagoDTO> DetalleCatalogoList { get; set; }
        public Result Result { get; set; }
        public ResponseListaDetalleCatalogo()
        {
            DetalleCatalogoList = new List<ListaDetalleCatalagoDTO>();
            this.Result = new Result();
        }
    }
}