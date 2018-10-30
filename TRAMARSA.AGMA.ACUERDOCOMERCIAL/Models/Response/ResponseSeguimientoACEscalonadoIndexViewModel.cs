using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseSeguimientoACEscalonadoIndexViewModel
    {
        public List<ListaLineaViewModel> Linea { get; set; }
        public List<ListaRolClienteViewModel> Rol { get; set; }
        public List<ListaDetalleCatalagoViewModel> Estados { get; set; }
        public string FechaDefault { get; set; }
        public string FechaFinDefault { get; set; }
    }
}