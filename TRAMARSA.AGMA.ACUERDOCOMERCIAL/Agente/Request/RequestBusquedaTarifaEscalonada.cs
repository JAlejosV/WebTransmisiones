using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestBusquedaTarifaEscalonada : BaseRequest
    {
        public string CodigoLinea { get; set; }
        public string DescripcionTarifa { get; set; }
        public string CodigoTipoContenedor { get; set; }
        public bool FlagTarifaLigada { get; set; }
        public bool FlagVigente { get; set; }
        public DateTime? FechaVigencia { get; set; }
    }
}