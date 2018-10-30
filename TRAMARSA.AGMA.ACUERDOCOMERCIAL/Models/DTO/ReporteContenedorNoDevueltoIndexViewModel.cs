using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ReporteContenedorNoDevueltoIndexViewModel
    {
        public List<ListaLineaViewModel> Linea { get; set; }
        public string FechaDesdeDefault { get; set; }
        public string FechaHastaDefault { get; set; }
    }
}