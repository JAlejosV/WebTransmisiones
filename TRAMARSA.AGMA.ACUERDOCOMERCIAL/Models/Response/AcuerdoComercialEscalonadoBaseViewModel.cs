using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.AcuerdoComercial;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class AcuerdoComercialEscalonadoBaseViewModel
    {
        public List<AcuerdoComercialEscalonadoTarifaViewModel> ListaAcuerdoComercialEscalonadoTarifa { get; set; }
        public List<ConsultaDetalleTarifaEscalonadaLigadaViewModel> TarifaEscalonadaLigadaList { get; set; }
        public AcuerdoComercialEscalonadoBaseViewModel()
        {
            ListaAcuerdoComercialEscalonadoTarifa = new List<AcuerdoComercialEscalonadoTarifaViewModel>();
            TarifaEscalonadaLigadaList = new List<ConsultaDetalleTarifaEscalonadaLigadaViewModel>();
        }
    }
}