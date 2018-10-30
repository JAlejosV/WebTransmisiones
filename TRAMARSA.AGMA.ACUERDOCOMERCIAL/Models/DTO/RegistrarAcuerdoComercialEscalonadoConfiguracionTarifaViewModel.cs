using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class RegistrarAcuerdoComercialEscalonadoConfiguracionTarifaViewModel
    {
        public List<ListaDetalleCatalagoViewModel> ListaTipoFechaCalculo { get; set; }
        public List<ListaDetalleCatalagoViewModel> ListaTipoDiaCalculo { get; set; }
    }
}