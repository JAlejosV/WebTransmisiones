using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.TarifaEscalonada;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class RequestRegistrarTarifaEscalonadaViewModel
    {
        public string CodigoRegimen { get; set; }
        public string CodigoTarifa { get; set; }
        public string CodigoConcepto { get; set; }
        public string CodigoLinea { get; set; }
        public string CodigoUnidadCalculo { get; set; }
        public string CodigoUsuarioAutorizador { get; set; }
        public string Usuario { get; set; }
        public List<TarifaEscalonadaPeriodoViewModel> ListaTarifaEscalonadaPeriodo { get; set; }
        public List<TarifaEscalonadaSucursalViewModel> ListaTarifaEscalonadaSucursal { get; set; }
        public List<TarifaEscalonadaVigenciaViewModel> ListaTarifaEscalonadaVigencia { get; set; }
        public List<TarifaEscalonadaLigadaViewModel> ListaTarifaEscalonadaLigada { get; set; }
        public RequestRegistrarTarifaEscalonadaViewModel()
        {
            this.ListaTarifaEscalonadaPeriodo = new List<TarifaEscalonadaPeriodoViewModel>();
            this.ListaTarifaEscalonadaSucursal = new List<TarifaEscalonadaSucursalViewModel>();
            this.ListaTarifaEscalonadaVigencia = new List<TarifaEscalonadaVigenciaViewModel>();
            this.ListaTarifaEscalonadaLigada = new List<TarifaEscalonadaLigadaViewModel>();

        }

    }
}
