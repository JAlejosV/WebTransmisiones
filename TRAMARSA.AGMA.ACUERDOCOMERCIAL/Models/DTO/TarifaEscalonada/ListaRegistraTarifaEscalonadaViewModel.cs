using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ListaRegistraTarifaEscalonadaViewModel
    {
        public List<ListaSucursalViewModel> Sucursal { get; set; }
        public List<ListaLineaViewModel> Linea { get; set; }
        public List<ListaDetalleCatalagoViewModel> ListaUnidadCalculo { get; set; }
        public List<ListaDetalleCatalagoViewModel> ListaTipoCobro { get; set; }
        public List<ListaDetalleCatalagoViewModel> ListaTipoFechaCalculo { get; set; }
        public List<ListaDetalleCatalagoViewModel> ListaTipoDiaCalculo { get; set; }
        public List<ListaMonedaViewModel> ListaMonedas { get; set; }
        public List<ListaClaseContenedorViewModel> ListaCategoriaContenedor { get; set; }
        public List<ListaClaseContenedorViewModel> ListaTipoContenedor { get; set; }

    }

}