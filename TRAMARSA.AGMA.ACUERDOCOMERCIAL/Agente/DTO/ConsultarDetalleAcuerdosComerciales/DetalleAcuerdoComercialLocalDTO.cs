using System;
using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;


namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.DTO.AcuerdosComerciales
{
    public class DetalleAcuerdoComercialLocalDTO
    {

        public DetalleAcuerdoComercialLocalDTO()
        {
            this.ListaAcuerdoComercialLocalSucursal = new List<AcuerdoComercialLocalSucursalDTO>();         
            this.ListaAcuerdoComercialLocalSucursalTerminal = new List<AcuerdoComercialLocalSucursalTerminalDTO>();
            this.ListaAcuerdoComercialLocalRA = new List<AcuerdoComercialLocalRADTO>();
            this.ListaAcuerdoComercialLocalPuerto = new List<AcuerdoComercialLocalPuertoDTO>();           
            this.ListaAcuerdoComercialLocalClienteBLMaster = new List<AcuerdoComercialLocalClienteBLMasterDTO>();
            this.ListaAcuerdoComercialLocalAgenteBLMaster = new List<AcuerdoComercialLocalAgenteBLMasterDTO>();
            this.ListaAcuerdoComercialLocalClienteBLHouse = new List<AcuerdoComercialLocalClienteBLHouseDTO>();
            this.ListaAcuerdoComercialLocalAgenteBLHouse = new List<AcuerdoComercialLocalAgenteBLHouseDTO>(); 
            this.ListaAcuerdoComercialLocalServicioNave = new List<AcuerdoComercialLocalServicioNaveDTO>();  
            this.ListaAcuerdoComercialLocalServicioBL = new List<AcuerdoComercialLocalServicioBLDTO>();    
            this.ListaAcuerdoComercialLocalTipoContenedor = new List<AcuerdoComercialLocalTipoContenedorDTO>();   
            this.ListaAcuerdoComercialLocalCarga = new List<AcuerdoComercialLocalCargaDTO>();
            this.ListaAcuerdoComercialLocalTarifa = new List<AcuerdoComercialLocalTarifaDTO>();
            this.ListaAcuerdoComercialLocalTarifaLigada = new List<AcuerdoComercialLocalTarifaLigadaDTO>();
            this.ListaAcuerdoComercialLocalTipoCarga = new List<AcuerdoComercialLocalTipoCargaRequestDTO>();
        }

        public int CodigoAcuerdoComercialLocal { get; set; }
        public string Estado  { get; set; }
        public string CodigoLinea  { get; set; }
        public string CodigoUsuarioAutorizador  { get; set; }
        public string Autorizado { get; set; }
        public DateTime? FechaAutorizacion { get; set; }
        public string CodigoTipoCriterio { get; set; }
        public DateTime? InicioVigencia { get; set; }
        public DateTime? FinVigencia { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public bool EstadoRegistro { get; set; }
        public string DescripcionEstadoRegistro { get; set; }
        public string Accion { get; set; }
        public string CodigoCondicion { get; set; }
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
        public List<AcuerdoComercialLocalConsultaMatchCodeDTO> ListaAcuerdoComercialLocalMatchCode { get; set; }
        public List<AcuerdoComercialLocalConsultaPartidaArancelariaDTO> ListaAcuerdoComercialLocalPartidaArancelaria { get; set; }
    }
}
