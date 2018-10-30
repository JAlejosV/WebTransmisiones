using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseConfiguracionPeriodoACEscalonadoViewModel
    {
        public List<ListaMonedaViewModel> ListaMonedas { get; set; }
        public List<ListaClaseContenedorViewModel> ListaCategoriaContenedor { get; set; }
        public List<ListaClaseContenedorViewModel> ListaTipoContenedor { get; set; }
    }
}