using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestCargaMasivaViewModel
    {
        public string CodigoLinea { get; set; }
        public UsuarioSeguridadViewModel Usuario { get; set; }
        public List<CargaMasivaAcuerdoComercialViewModel> ListaAcuerdoComercial { get; set; }
        public RequestCargaMasivaViewModel()
        {
            ListaAcuerdoComercial = new List<CargaMasivaAcuerdoComercialViewModel>();
        }
    }
}