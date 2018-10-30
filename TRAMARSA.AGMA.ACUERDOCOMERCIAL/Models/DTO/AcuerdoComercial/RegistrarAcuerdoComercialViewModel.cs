using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class RegistrarAcuerdoComercialViewModel
    {
        public List<ListaSucursalViewModel> Sucursal { get; set; }
        public List<ListaTerminalPortuarioViewModel> TerminalPorturario { get; set; }
        public List<ListaLineaViewModel> Linea { get; set; }
        public List<ListaDetalleCatalagoViewModel> Tipo { get; set; }
        public List<ListaDetalleCatalagoViewModel> TipoPuerto { get; set; }
        public List<ListaDetalleCatalagoViewModel> TipoDescuento { get; set; }
        public List<ListaMonedaViewModel> MonedaAcuerdo { get; set; }
        public List<ListaDetalleCatalagoViewModel> Codicion { get; set; }
        public List<ListaDetalleCatalagoViewModel> TipoCarga { get; set; }
        public List<ListaRolClienteViewModel> ListaRol { get; set; }
    }

}