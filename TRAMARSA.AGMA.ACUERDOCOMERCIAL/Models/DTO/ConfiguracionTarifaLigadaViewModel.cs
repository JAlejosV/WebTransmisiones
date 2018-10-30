using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ConfiguracionTarifaLigadaViewModel
    {
        public List<ListaMonedaViewModel> Moneda { get; set; }
        public List<ListaDetalleCatalagoViewModel> Configuracion { get; set; }

    }
}