using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestBusquedaTarifaLocal //: BaseRequest
    {
        public string CodigoLinea { get; set; }
        public string DescripcionTarifa { get; set; }
        public string CodigoSucursal { get; set; }
        public string CodigoTerminalPortuario { get; set; }
        public bool FlagTarifaLigada { get; set; }
        public bool FlagVigente { get; set; }
        public DateTime? FechaVigencia { get; set; }

        public int? NroRegistrosPorPagina { get; set; }
        public string OrdenCampo { get; set; }
        public string OrdenOrientacion { get; set; }
        public int? PaginaActual { get; set; }

    }
}