using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ReporteTarifaLocalIndexViewModel
    {
        public List<ListaSucursalViewModel> Sucursal { get; set; }
        public List<ListaLineaViewModel> Linea { get; set; }
        public List<ListaMonedaViewModel> Moneda { get; set; }
    }
}