using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ResponseBusquedaDocumentoOrigenIndexViewModel
    {
        public List<ListaLineaViewModel> Linea { get; set; }
        public List<ListaDetalleCatalagoViewModel> TipoDocumento { get; set; }
        public List<ListaDetalleCatalagoViewModel> TipoDocumentoOrigen { get; set; }
    }
}