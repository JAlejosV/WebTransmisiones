using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ConfiguracionLineaIndexViewModel
    {
        public List<ListaLineaViewModel> Linea { get; set; }
        public List<ListaDetalleCatalagoViewModel> Estados { get; set; }
    }
}