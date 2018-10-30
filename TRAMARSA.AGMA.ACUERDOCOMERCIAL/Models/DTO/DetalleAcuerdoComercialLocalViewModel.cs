using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.DTO.AcuerdosComerciales;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.AcuerdoComercial;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class DetalleAcuerdoComercialLocalViewModel
    {
        public int CodigoAcuerdoComercialLocal { get; set; }
        public string Estado { get; set; }
        public string CodigoLinea { get; set; }
        public string CodigoUsuarioAutorizador { get; set; }
        public string Autorizado { get; set; }
        public string FechaAutorizacion { get; set; }
        public string CodigoTipoCriterio { get; set; }
        public string InicioVigencia { get; set; }
        public string FinVigencia { get; set; }
        public string UsuarioCreacion { get; set; }
        public string FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string FechaHoraActualizacion { get; set; }
        public bool EstadoRegistro { get; set; }
        public string DescripcionEstadoRegistro { get; set; }
        public string Accion { get; set; }
        public string CodigoTipoCondicion { get; set; }

        public List<AcuerdoComercialLocalSucursalDTO> ListaAcuerdoComercialLocalSucursal { get; set; }
        public List<AcuerdoComercialLocalSucursalTerminalDTO> ListaAcuerdoComercialLocalSucursalTerminal { get; set; }
        public List<AcuerdoComercialLocalRADTO> ListaAcuerdoComercialLocalRA { get; set; }
        public List<AcuerdoComercialLocalPuertoDTO> ListaAcuerdoComercialLocalPuerto { get; set; }
        public List<AcuerdoComercialLocalClienteBLMasterDTO> ListaAcuerdoComercialLocalClienteBLMaster { get; set; }
        public List<AcuerdoComercialLocalAgenteBLMasterDTO> ListaAcuerdoComercialLocalAgenteBLMaster { get; set; }
        public List<AcuerdoComercialLocalClienteBLHouseDTO> ListaAcuerdoComercialLocalClienteBLHouse { get; set; }
        public List<AcuerdoComercialLocalAgenteBLHouseDTO> ListaAcuerdoComercialLocalAgenteBLHouse { get; set; }
        public List<AcuerdoComercialLocalServicioNaveDTO> ListaAcuerdoComercialLocalServicioNave { get; set; }
        public List<AcuerdoComercialLocalServicioBLDTO> ListaAcuerdoComercialLocalServicioBL { get; set; }
        public List<AcuerdoComercialLocalTipoContenedorDTO> ListaAcuerdoComercialLocalTipoContenedor { get; set; }
        public List<AcuerdoComercialLocalCargaDTO> ListaAcuerdoComercialLocalCarga { get; set; }
        public List<AcuerdoComercialLocalTarifaDTO> ListaAcuerdoComercialLocalTarifa { get; set; }
        public List<AcuerdoComercialLocalTarifaLigadaDTO> ListaAcuerdoComercialLocalTarifaLigada { get; set; }
        public List<AcuerdoComercialLocalTipoCargaRequestDTO> ListaAcuerdoComercialLocalTipoCarga { get; set; }
        public List<AcuerdoComercialLocalConsultaMatchCodeViewModel> ListaAcuerdoComercialLocalMatchCode { get; set; }
        public List<AcuerdoComercialLocalConsultaPartidaArancelariaViewModel> ListaAcuerdoComercialLocalPartidaArancelaria { get; set; }


        public List<ListaSucursalViewModel> ListMatchSucursal { get; set; }
        public List<ListaTerminalPortuarioViewModel> ListMatchTerminalPorturario { get; set; }

        public DetalleAcuerdoComercialLocalViewModel()
        {
            ListaAcuerdoComercialLocalSucursal = new List<AcuerdoComercialLocalSucursalDTO>();
            ListaAcuerdoComercialLocalSucursalTerminal = new List<AcuerdoComercialLocalSucursalTerminalDTO>();
            ListaAcuerdoComercialLocalRA = new List<AcuerdoComercialLocalRADTO>();
            ListaAcuerdoComercialLocalPuerto = new List<AcuerdoComercialLocalPuertoDTO>();
            ListaAcuerdoComercialLocalClienteBLMaster = new List<AcuerdoComercialLocalClienteBLMasterDTO>();
            ListaAcuerdoComercialLocalAgenteBLMaster = new List<AcuerdoComercialLocalAgenteBLMasterDTO>();
            ListaAcuerdoComercialLocalClienteBLHouse = new List<AcuerdoComercialLocalClienteBLHouseDTO>();
            ListaAcuerdoComercialLocalAgenteBLHouse = new List<AcuerdoComercialLocalAgenteBLHouseDTO>();
            ListaAcuerdoComercialLocalServicioNave = new List<AcuerdoComercialLocalServicioNaveDTO>();
            ListaAcuerdoComercialLocalServicioBL = new List<AcuerdoComercialLocalServicioBLDTO>();
            ListaAcuerdoComercialLocalTipoContenedor = new List<AcuerdoComercialLocalTipoContenedorDTO>();
            ListaAcuerdoComercialLocalCarga = new List<AcuerdoComercialLocalCargaDTO>();
            ListaAcuerdoComercialLocalTarifa = new List<AcuerdoComercialLocalTarifaDTO>();
            ListaAcuerdoComercialLocalTarifaLigada = new List<AcuerdoComercialLocalTarifaLigadaDTO>();
            ListaAcuerdoComercialLocalTipoCarga = new List<AcuerdoComercialLocalTipoCargaRequestDTO>();
            ListaAcuerdoComercialLocalMatchCode = new List<AcuerdoComercialLocalConsultaMatchCodeViewModel>();
            ListaAcuerdoComercialLocalPartidaArancelaria = new List<AcuerdoComercialLocalConsultaPartidaArancelariaViewModel>();

            ListMatchSucursal = new List<ListaSucursalViewModel>();
            ListMatchTerminalPorturario = new List<ListaTerminalPortuarioViewModel>();
        }
    }
}