using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.TarifaEscalonada;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class DetalleTarifaEscalonadaViewModel
    {
        public string Autorizado { get; set; }
        public string CodigoConcepto { get; set; }
        public string CodigoLinea { get; set; }
        public string CodigoRegimen { get; set; }
        public string CodigoTarifa { get; set; }
        public int CodigoTarifaEscalonada { get; set; }
        //public string CodigoTipoDiaCalculo { get; set; }
        //public string CodigoTipoFechaCalculo { get; set; }
        //public int DiasDelayCalculo { get; set; }
        //public string FinVigencia { get; set; }
        //public string InicioVigencia { get; set; }
        public string CodigoUnidadCalculo { get; set; }
        public string CodigoUsuarioAutorizador { get; set; }
        public string DescripcionLinea { get; set; }
        public string DescripcionTarifa { get; set; }
        public string EstadoRegistro { get; set; }
        public string FechaHoraActualizacion { get; set; }
        public string FechaHoraCreacion { get; set; }
        public string Regimen { get; set; }
        public string UnidadCalculo { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public List<ConsultaDetalleTarifaEscalonadaLigadaViewModel> TarifaEscalonadaLigadaList { get; set; }
        public List<ConsultaDetalleTarifaEscalonadaPeriodoViewModel> TarifaEscalonadaPeriodoList { get; set; }
        public List<ConsultaDetalleTarifaEscalonadaSucursalViewModel> TarifaEscalonadaSucursalList { get; set; }
        public List<ConsultaDetalleTarifaEscalonadaVigenciaViewModel> TarifaEscalonadaVigenciaList { get; set; }
        public List<DistribucionTarifaViewModel> DistribucionTarifaList { get; set; }
        public DetalleTarifaEscalonadaViewModel()
        {
            TarifaEscalonadaLigadaList = new List<ConsultaDetalleTarifaEscalonadaLigadaViewModel>();
            TarifaEscalonadaPeriodoList = new List<ConsultaDetalleTarifaEscalonadaPeriodoViewModel>();
            TarifaEscalonadaSucursalList = new List<ConsultaDetalleTarifaEscalonadaSucursalViewModel>();
            DistribucionTarifaList = new List<DistribucionTarifaViewModel>();
            TarifaEscalonadaVigenciaList = new List<ConsultaDetalleTarifaEscalonadaVigenciaViewModel>();
        }
    }
}