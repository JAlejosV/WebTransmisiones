using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ActualizaAcuerdoComercialLocalRequestDTO
    {

        public ActualizaAcuerdoComercialLocalRequestDTO()
        {
            this.ListaAcuerdoComercialLocalSucursal = new List<AcuerdoComercialLocalSucursalRequestDTO>();
            this.ListaAcuerdoComercialLocalSucursalTerminal = new List<AcuerdoComercialLocalSucursalTerminalRequestDTO>();
            this.ListaAcuerdoComercialLocalRA = new List<AcuerdoComercialLocalRARequestDTO>();
            this.ListaAcuerdoComercialLocalPuerto = new List<AcuerdoComercialLocalPuertoRequestDTO>();
            this.ListaAcuerdoComercialLocalClienteBLMaster = new List<AcuerdoComercialLocalClienteBLMasterRequestDTO>();
            this.ListaAcuerdoComercialLocalAgenteBLMaster = new List<AcuerdoComercialLocalAgenteBLMasterRequestDTO>();
            this.ListaAcuerdoComercialLocalClienteBLHouse = new List<AcuerdoComercialLocalClienteBLHouseRequestDTO>();
            this.ListaAcuerdoComercialLocalAgenteBLHouse = new List<AcuerdoComercialLocalAgenteBLHouseRequestDTO>();
            this.ListaAcuerdoComercialLocalServicioNave = new List<AcuerdoComercialLocalServicioNaveRequestDTO>();
            this.ListaAcuerdoComercialLocalServicioBL = new List<AcuerdoComercialLocalServicioBLRequestDTO>();
            this.ListaAcuerdoComercialLocalTipoContenedor = new List<AcuerdoComercialLocalTipoContenedorRequestDTO>();
            this.ListaAcuerdoComercialLocalCarga = new List<AcuerdoComercialLocalCargaRequestDTO>();
            this.ListaAcuerdoComercialLocalTarifa = new List<AcuerdoComercialLocalTarifaRequestDTO>();
            this.ListaAcuerdoComercialLocalTarifaLigada = new List<AcuerdoComercialLocalTarifaLigadaRequestDTO>();
            this.ListaAcuerdoComercialLocalTipoCarga = new List<AcuerdoComercialLocalTipoCargaRequestDTO>();
            this.ListaAcuerdoComercialLocalMatchCode = new List<AcuerdoComercialLocalMatchCodeDTO>();
            this.ListaAcuerdoComercialLocalPartidaArancelaria = new List<AcuerdoComercialLocalPartidaArancelariaDTO>();

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
        public string CodigoCondicion { get; set; }

        public List<AcuerdoComercialLocalSucursalRequestDTO> ListaAcuerdoComercialLocalSucursal { get; set; }
        public List<AcuerdoComercialLocalSucursalTerminalRequestDTO> ListaAcuerdoComercialLocalSucursalTerminal { get; set; }
        public List<AcuerdoComercialLocalRARequestDTO> ListaAcuerdoComercialLocalRA { get; set; }
        public List<AcuerdoComercialLocalPuertoRequestDTO> ListaAcuerdoComercialLocalPuerto { get; set; }
        public List<AcuerdoComercialLocalClienteBLMasterRequestDTO> ListaAcuerdoComercialLocalClienteBLMaster { get; set; }
        public List<AcuerdoComercialLocalAgenteBLMasterRequestDTO> ListaAcuerdoComercialLocalAgenteBLMaster { get; set; }
        public List<AcuerdoComercialLocalClienteBLHouseRequestDTO> ListaAcuerdoComercialLocalClienteBLHouse { get; set; }
        public List<AcuerdoComercialLocalAgenteBLHouseRequestDTO> ListaAcuerdoComercialLocalAgenteBLHouse { get; set; }
        public List<AcuerdoComercialLocalServicioNaveRequestDTO> ListaAcuerdoComercialLocalServicioNave { get; set; }
        public List<AcuerdoComercialLocalServicioBLRequestDTO> ListaAcuerdoComercialLocalServicioBL { get; set; }
        public List<AcuerdoComercialLocalTipoContenedorRequestDTO> ListaAcuerdoComercialLocalTipoContenedor { get; set; }
        public List<AcuerdoComercialLocalCargaRequestDTO> ListaAcuerdoComercialLocalCarga { get; set; }
        public List<AcuerdoComercialLocalTarifaRequestDTO> ListaAcuerdoComercialLocalTarifa { get; set; }
        public List<AcuerdoComercialLocalTarifaLigadaRequestDTO> ListaAcuerdoComercialLocalTarifaLigada { get; set; }
        public List<AcuerdoComercialLocalTipoCargaRequestDTO> ListaAcuerdoComercialLocalTipoCarga { get; set; }

        public List<AcuerdoComercialLocalMatchCodeDTO> ListaAcuerdoComercialLocalMatchCode { get; set; }
        public List<AcuerdoComercialLocalPartidaArancelariaDTO> ListaAcuerdoComercialLocalPartidaArancelaria { get; set; }
        
    }
}