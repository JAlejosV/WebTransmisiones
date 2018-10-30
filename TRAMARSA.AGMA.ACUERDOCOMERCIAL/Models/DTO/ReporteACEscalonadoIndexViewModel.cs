using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ReporteACEscalonadoIndexViewModel
    {
        public List<ListaSucursalViewModel> Sucursal { get; set; }
        public List<ListaLineaViewModel> Linea { get; set; }
        //public List<ListaMonedaViewModel> Moneda { get; set; }
        public List<ListaDetalleCatalagoViewModel> TipoBL { get; set; }
        public string FechaVigenciaHastaDefault { get; set; }
    }
}