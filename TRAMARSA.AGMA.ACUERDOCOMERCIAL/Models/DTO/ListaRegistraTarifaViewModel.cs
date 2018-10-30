using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ListaRegistraTarifaViewModel
    {
        public List<ListaSucursalViewModel> Sucursal { get; set; }
        public List<ListaTerminalPortuarioViewModel> TerminalPorturario { get; set; }
        public List<ListaLineaViewModel> Linea { get; set; }
        public List<ListaMonedaViewModel> Moneda { get; set; }
        public List<ListaDetalleCatalagoViewModel> Vigencia { get; set; }
        public List<ListaDetalleCatalagoViewModel> VigenciaValor { get; set; }
    }

}