using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.AcuerdoComercial;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.ViewModel
{
    public class ActualizaAcuerdoComercialLocalRequestViewModel
    {

        public ActualizaAcuerdoComercialLocalRequestViewModel()
        {
            this.ListaAcuerdoComercialLocalSucursal = new List<AcuerdoComercialLocalSucursalRequestViewModel>();
            this.ListaAcuerdoComercialLocalSucursalTerminal = new List<AcuerdoComercialLocalSucursalTerminalRequestViewModel>();
            this.ListaAcuerdoComercialLocalRA = new List<AcuerdoComercialLocalRARequestViewModel>();
            this.ListaAcuerdoComercialLocalPuerto = new List<AcuerdoComercialLocalPuertoRequestViewModel>();
            this.ListaAcuerdoComercialLocalClienteBLMaster = new List<AcuerdoComercialLocalClienteBLMasterRequestViewModel>();
            this.ListaAcuerdoComercialLocalAgenteBLMaster = new List<AcuerdoComercialLocalAgenteBLMasterRequestViewModel>();
            this.ListaAcuerdoComercialLocalClienteBLHouse = new List<AcuerdoComercialLocalClienteBLHouseRequestViewModel>();
            this.ListaAcuerdoComercialLocalAgenteBLHouse = new List<AcuerdoComercialLocalAgenteBLHouseRequestViewModel>();
            this.ListaAcuerdoComercialLocalServicioNave = new List<AcuerdoComercialLocalServicioNaveRequestViewModel>();
            this.ListaAcuerdoComercialLocalServicioBL = new List<AcuerdoComercialLocalServicioBLRequestViewModel>();
            this.ListaAcuerdoComercialLocalTipoContenedor = new List<AcuerdoComercialLocalTipoContenedorRequestViewModel>();
            this.ListaAcuerdoComercialLocalCarga = new List<AcuerdoComercialLocalCargaRequestViewModel>();
            this.ListaAcuerdoComercialLocalTarifa = new List<AcuerdoComercialLocalTarifaRequestViewModel>();
            this.ListaAcuerdoComercialLocalTarifaLigada = new List<AcuerdoComercialLocalTarifaLigadaRequestViewModel>();
            this.ListaAcuerdoComercialLocalTipoCarga = new List<AcuerdoComercialLocalTipoCargaRequestViewModel>();
            this.ListaAcuerdoComercialLocalMatchCode = new List<AcuerdoComercialLocalMatchCodeViewModel>();
            this.ListaAcuerdoComercialLocalPartidaArancelaria = new List<AcuerdoComercialLocalPartidaArancelariaViewModel>();
        }

        public int CodigoAcuerdoComercialLocal { get; set; }
        public string Estado { get; set; }
        public string CodigoLinea { get; set; }
        public string CodigoUsuarioAutorizador { get; set; }
        public DateTime? FechaAutorizacion { get; set; }
        public string CodigoTipoCriterio { get; set; }
        public DateTime? InicioVigencia { get; set; }
        public DateTime? FinVigencia { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public bool EstadoRegistro { get; set; }
        public string Accion { get; set; }
        public string CodigoTipoCondicion { get; set; }
        public List<AcuerdoComercialLocalSucursalRequestViewModel> ListaAcuerdoComercialLocalSucursal { get; set; }
        public List<AcuerdoComercialLocalSucursalTerminalRequestViewModel> ListaAcuerdoComercialLocalSucursalTerminal { get; set; }
        public List<AcuerdoComercialLocalRARequestViewModel> ListaAcuerdoComercialLocalRA { get; set; }
        public List<AcuerdoComercialLocalPuertoRequestViewModel> ListaAcuerdoComercialLocalPuerto { get; set; }
        public List<AcuerdoComercialLocalClienteBLMasterRequestViewModel> ListaAcuerdoComercialLocalClienteBLMaster { get; set; }
        public List<AcuerdoComercialLocalAgenteBLMasterRequestViewModel> ListaAcuerdoComercialLocalAgenteBLMaster { get; set; }
        public List<AcuerdoComercialLocalClienteBLHouseRequestViewModel> ListaAcuerdoComercialLocalClienteBLHouse { get; set; }
        public List<AcuerdoComercialLocalAgenteBLHouseRequestViewModel> ListaAcuerdoComercialLocalAgenteBLHouse { get; set; }
        public List<AcuerdoComercialLocalServicioNaveRequestViewModel> ListaAcuerdoComercialLocalServicioNave { get; set; }
        public List<AcuerdoComercialLocalServicioBLRequestViewModel> ListaAcuerdoComercialLocalServicioBL { get; set; }
        public List<AcuerdoComercialLocalTipoContenedorRequestViewModel> ListaAcuerdoComercialLocalTipoContenedor { get; set; }
        public List<AcuerdoComercialLocalCargaRequestViewModel> ListaAcuerdoComercialLocalCarga { get; set; }
        public List<AcuerdoComercialLocalTarifaRequestViewModel> ListaAcuerdoComercialLocalTarifa { get; set; }
        public List<AcuerdoComercialLocalTarifaLigadaRequestViewModel> ListaAcuerdoComercialLocalTarifaLigada { get; set; }
        public List<AcuerdoComercialLocalTipoCargaRequestViewModel> ListaAcuerdoComercialLocalTipoCarga { get; set; }

        public List<AcuerdoComercialLocalMatchCodeViewModel> ListaAcuerdoComercialLocalMatchCode { get; set; }
        public List<AcuerdoComercialLocalPartidaArancelariaViewModel> ListaAcuerdoComercialLocalPartidaArancelaria { get; set; }
    }
}