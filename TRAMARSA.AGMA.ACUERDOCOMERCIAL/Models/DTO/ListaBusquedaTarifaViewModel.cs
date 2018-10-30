using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ListaBusquedaTarifaViewModel
    {
        public List<ListaLineaViewModel> Linea { get; set; }
        public List<ListaDetalleCatalagoViewModel> Regimen { get; set; }
        public string CodigoTarifa { get; set; }
        public string DescripcionTarifa { get; set; }
    }
}