using System;
using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ActualizarAcuerdoComercialEscalonadoDTO
    {
        public int CodigoAcuerdoComercialEscalonado { get; set; }
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
        public List<AcuerdoComercialEscalonadoSucursalRequestDTO> ListaAcuerdoComercialEscalonadoSucursal { get; set; }
        public List<AcuerdoComercialEscalonadoSucursalTerminalRequestDTO> ListaAcuerdoComercialEscalonadoSucursalTerminal { get; set; }
        public List<AcuerdoComercialEscalonadoRARequestDTO> ListaAcuerdoComercialEscalonadoRA { get; set; }
        public List<AcuerdoComercialEscalonadoPuertoRequestDTO> ListaAcuerdoComercialEscalonadoPuerto { get; set; }
        public List<AcuerdoComercialEscalonadoClienteBLMasterRequestDTO> ListaAcuerdoComercialEscalonadoClienteBLMaster { get; set; }
        public List<AcuerdoComercialEscalonadoAgenteBLMasterRequestDTO> ListaAcuerdoComercialEscalonadoAgenteBLMaster { get; set; }
        public List<AcuerdoComercialEscalonadoClienteBLHouseRequestDTO> ListaAcuerdoComercialEscalonadoClienteBLHouse { get; set; }
        public List<AcuerdoComercialEscalonadoAgenteBLHouseRequestDTO> ListaAcuerdoComercialEscalonadoAgenteBLHouse { get; set; }
        public List<AcuerdoComercialEscalonadoServicioNaveRequestDTO> ListaAcuerdoComercialEscalonadoServicioNave { get; set; }
        public List<AcuerdoComercialEscalonadoServicioBLRequestDTO> ListaAcuerdoComercialEscalonadoServicioBL { get; set; }
        public List<AcuerdoComercialEscalonadoCargaRequestDTO> ListaAcuerdoComercialEscalonadoCarga { get; set; }
        public List<AcuerdoComercialEscalonadoTarifaRequestDTO> ListaAcuerdoComercialEscalonadoTarifa { get; set; }
        public List<AcuerdoComercialEscalonadoTarifaPeriodoRequestDTO> ListaAcuerdoComercialEscalonadoTarifaPeriodo { get; set; }
        public List<AcuerdoComercialEscalonadoTarifaLigadaRequestDTO> ListaAcuerdoComercialEscalonadoTarifaLigada { get; set; }

        public List<AcuerdoComercialEscalonadoMatchCodeDTO> ListaAcuerdoComercialEscalonadoMatchCode { get; set; }
        public List<AcuerdoComercialEscalonadoPartidaArancelariaDTO> ListaAcuerdoComercialEscalonadoPartidaArancelaria { get; set; }


        public ActualizarAcuerdoComercialEscalonadoDTO()
        {
            ListaAcuerdoComercialEscalonadoSucursal = new List<AcuerdoComercialEscalonadoSucursalRequestDTO>();
            ListaAcuerdoComercialEscalonadoSucursalTerminal = new List<AcuerdoComercialEscalonadoSucursalTerminalRequestDTO>();
            ListaAcuerdoComercialEscalonadoRA = new List<AcuerdoComercialEscalonadoRARequestDTO>();
            ListaAcuerdoComercialEscalonadoPuerto = new List<AcuerdoComercialEscalonadoPuertoRequestDTO>();
            ListaAcuerdoComercialEscalonadoClienteBLMaster = new List<AcuerdoComercialEscalonadoClienteBLMasterRequestDTO>();
            ListaAcuerdoComercialEscalonadoAgenteBLMaster = new List<AcuerdoComercialEscalonadoAgenteBLMasterRequestDTO>();
            ListaAcuerdoComercialEscalonadoClienteBLHouse = new List<AcuerdoComercialEscalonadoClienteBLHouseRequestDTO>();
            ListaAcuerdoComercialEscalonadoAgenteBLHouse = new List<AcuerdoComercialEscalonadoAgenteBLHouseRequestDTO>();
            ListaAcuerdoComercialEscalonadoServicioNave = new List<AcuerdoComercialEscalonadoServicioNaveRequestDTO>();
            ListaAcuerdoComercialEscalonadoServicioBL = new List<AcuerdoComercialEscalonadoServicioBLRequestDTO>();
            ListaAcuerdoComercialEscalonadoCarga = new List<AcuerdoComercialEscalonadoCargaRequestDTO>();

            ListaAcuerdoComercialEscalonadoTarifa = new List<AcuerdoComercialEscalonadoTarifaRequestDTO>();
            ListaAcuerdoComercialEscalonadoTarifaPeriodo = new List<AcuerdoComercialEscalonadoTarifaPeriodoRequestDTO>();
            ListaAcuerdoComercialEscalonadoTarifaLigada = new List<AcuerdoComercialEscalonadoTarifaLigadaRequestDTO>();
            ListaAcuerdoComercialEscalonadoMatchCode = new List<AcuerdoComercialEscalonadoMatchCodeDTO>();
            ListaAcuerdoComercialEscalonadoPartidaArancelaria = new List<AcuerdoComercialEscalonadoPartidaArancelariaDTO>();

        }
    }
}