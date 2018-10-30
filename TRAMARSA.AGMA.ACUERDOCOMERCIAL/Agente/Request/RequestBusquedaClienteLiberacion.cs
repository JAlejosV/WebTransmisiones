using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestBusquedaClienteLiberacion:BaseRequest
    {
        public DateTime? FechaInicio;
        public DateTime? FechaFin;
        public string RazonSocial;
        public string Ruc;
    }

}