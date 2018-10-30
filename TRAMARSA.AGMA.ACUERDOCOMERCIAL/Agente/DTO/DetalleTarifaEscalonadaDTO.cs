using System;
using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class DetalleTarifaEscalonadaDTO
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
        //public DateTime? FinVigencia { get; set; }
        //public DateTime? InicioVigencia { get; set; }
        public string CodigoUnidadCalculo { get; set; }
        public string CodigoUsuarioAutorizador { get; set; }
        public string DescripcionLinea { get; set; }
        public string DescripcionTarifa { get; set; }
        public bool EstadoRegistro { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string Regimen { get; set; }
        public string UnidadCalculo { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public List<TarifaEscalonadaLigadaDTO> TarifaEscalonadaLigadaList { get; set; }
        public List<TarifaEscalonadaPeriodoDTO> TarifaEscalonadaPeriodoList { get; set; }
        public List<TarifaEscalonadaSucursalDTO> TarifaEscalonadaSucursalList { get; set; }
        public List<DistribucionTarifaDTO> DistribucionTarifaList { get; set; }
        public List<TarifaEscalonadaVigenciaDTO> TarifaEscalonadaVigenciaList { get; set; }
        public DetalleTarifaEscalonadaDTO()
        {
            TarifaEscalonadaLigadaList = new List<TarifaEscalonadaLigadaDTO>();
            TarifaEscalonadaPeriodoList = new List<TarifaEscalonadaPeriodoDTO>();
            TarifaEscalonadaSucursalList = new List<TarifaEscalonadaSucursalDTO>();
            DistribucionTarifaList = new List<DistribucionTarifaDTO>();
            TarifaEscalonadaVigenciaList = new List<TarifaEscalonadaVigenciaDTO>();
        }
    }
}