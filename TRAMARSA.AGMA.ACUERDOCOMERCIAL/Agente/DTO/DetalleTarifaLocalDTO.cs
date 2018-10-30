using System;
using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class DetalleTarifaLocalDTO
    {
        public string CodigoConcepto { get; set; }
        public string CodigoLinea { get; set; }
        public string CodigoMoneda { get; set; }
        public string CodigoRegimen { get; set; }
        public string CodigoTarifa { get; set; }
        public int CodigoTarifaLocal { get; set; }
        public string CodigoUsuarioAutorizador { get; set; }
        public string DescripcionLinea { get; set; }
        public string DescripcionMoneda { get; set; }
        public string EstadoRegistro { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public DateTime FechaHoraCreacion { get; set; }
        public decimal Monto { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public string Autorizado { get; set; }
        public string DescripcionTarifa { get; set; }
        public string UnidadCalculo { get; set; }
        public string Regimen { get; set; }
        public List<TarifaLocalLigadaDTO> TarifaLocalLigadaList { get; set; }
        public List<TarifaLocalSucursalDTO> TarifaLocalSucursalList { get; set; }
        public List<TarifaLocalTerminalDTO> TarifaLocalSucursalTerminalList { get; set; }
        public List<TarifaLocalVigenciaDTO> TarifaLocalVigenciaList { get; set; }
        public List<DistribucionTarifaDTO> DistribucionTarifaList { get; set; }
        public DetalleTarifaLocalDTO()
        {
            TarifaLocalLigadaList = new List<TarifaLocalLigadaDTO>();
            TarifaLocalSucursalList = new List<TarifaLocalSucursalDTO>();
            TarifaLocalSucursalTerminalList = new List<TarifaLocalTerminalDTO>();
            TarifaLocalVigenciaList = new List<TarifaLocalVigenciaDTO>();
            DistribucionTarifaList = new List<DistribucionTarifaDTO>();
        }
    }
}