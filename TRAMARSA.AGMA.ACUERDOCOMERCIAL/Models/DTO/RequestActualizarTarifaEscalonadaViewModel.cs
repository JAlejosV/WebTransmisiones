using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.TarifaEscalonada;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class RequestActualizarTarifaEscalonadaViewModel
    {
        public int CodigoTarifaEscalonada { get; set; }
        public string CodigoRegimen { get; set; }
        public string CodigoTarifa { get; set; }
        public string CodigoConcepto { get; set; }
        public string CodigoLinea { get; set; }
        public string CodigoUnidadCalculo { get; set; }
        public string CodigoUsuarioAutorizador { get; set; }
        public string EstadoRegistro { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string Accion { get; set; }
        public bool ValidarTarifaEnAC { get; set; }
        public List<TarifaEscalonadaPeriodoViewModel> ListaTarifaEscalonadaPeriodo { get; set; }
        public List<TarifaEscalonadaSucursalViewModel> ListaTarifaEscalonadaSucursal { get; set; }
        public List<TarifaEscalonadaVigenciaViewModel> ListaTarifaEscalonadaVigencia { get; set; }
        public List<TarifaEscalonadaLigadaViewModel> ListaTarifaEscalonadaLigada { get; set; }

        public RequestActualizarTarifaEscalonadaViewModel()
        {
            ListaTarifaEscalonadaPeriodo = new List<TarifaEscalonadaPeriodoViewModel>();
            ListaTarifaEscalonadaSucursal = new List<TarifaEscalonadaSucursalViewModel>();
            ListaTarifaEscalonadaVigencia = new List<TarifaEscalonadaVigenciaViewModel>();
            ListaTarifaEscalonadaLigada = new List<TarifaEscalonadaLigadaViewModel>();
        }
    }
}