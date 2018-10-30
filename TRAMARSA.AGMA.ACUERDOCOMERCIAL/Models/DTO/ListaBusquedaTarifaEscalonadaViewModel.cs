using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ListaBusquedaTarifaEscalonadaViewModel
    {
        public List<ListaLineaViewModel> Linea { get; set; }
        public List<ListaClaseContenedorViewModel> Contenedor { get; set; }
        public string FechaVigencia { get; set; }
        public string TipoDescuentoDefault { get; set; }
        public string MonedaDefault { get; set; }
        public string MontoAcuerdoDefault { get; set; }
    }
}