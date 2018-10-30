using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class BusquedaPuertoIndexViewModel
    {
        public string CodigoPuerto { get; set; }
        public string NombrePuerto { get; set; }
        public List<ListaDetalleCatalagoViewModel> TipoPuerto { get; set; }
        public List<ListaLineaViewModel> Linea { get; set; }
    }
}