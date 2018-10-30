using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestBusquedaLiberacionBL : BaseRequest
    {
        //public BusquedaLiberacionBL request;
        //public RequestBusquedaLiberacionBL()
        //{
        //    request = new BusquedaLiberacionBL();
        //}
        public string CodigoAgenteAduana { get; set; }
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public string NumeroSerie { get; set; }
        public int NumeroFactura { get; set; }


    }
}