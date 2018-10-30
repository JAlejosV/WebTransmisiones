using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class RegistrarAcuerdoComercialEscalonadoViewModel
    {
        public List<ListaSucursalViewModel> Sucursal { get; set; }
        public List<ListaTerminalPortuarioViewModel> TerminalPorturario { get; set; }
        public List<ListaLineaViewModel> Linea { get; set; }
        public List<ListaDetalleCatalagoViewModel> Tipo { get; set; }
        public List<ListaDetalleCatalagoViewModel> TipoPuerto { get; set; }
        public List<ListaDetalleCatalagoViewModel> TipoDescuento { get; set; }
        public List<ListaDetalleCatalagoViewModel> ListaTipoCobro { get; set; }
        public List<ListaMonedaViewModel> MonedaAcuerdo { get; set; }
        public List<ListaDetalleCatalagoViewModel> Codicion { get; set; }
        public AcuerdoComercialEscalonadoBaseViewModel BaseAce { get; set; }
        public List<ListaRolClienteViewModel> ListaRol { get; set; }
    }
}