using System;
using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class DetalleAcuerdoComercialEscalonadoDTO
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
        public string Autorizado { get; set; }
        public string DescripcionEstadoRegistro { get; set; }
        public string CodigoCondicion { get; set; }

        public List<AcuerdoComercialEscalonadoSucursalDTO> ListaAcuerdoComercialEscalonadoSucursal { get; set; }
        public List<AcuerdoComercialEscalonadoSucursalTerminalDTO> ListaAcuerdoComercialEscalonadoSucursalTerminal { get; set; }
        public List<AcuerdoComercialEscalonadoRADTO> ListaAcuerdoComercialEscalonadoRA { get; set; }
        public List<AcuerdoComercialEscalonadoPuertoDTO> ListaAcuerdoComercialEscalonadoPuerto { get; set; }
        public List<AcuerdoComercialEscalonadoClienteBLMasterDTO> ListaAcuerdoComercialEscalonadoClienteBLMaster { get; set; }
        public List<AcuerdoComercialEscalonadoAgenteBLMasterDTO> ListaAcuerdoComercialEscalonadoAgenteBLMaster { get; set; }
        public List<AcuerdoComercialEscalonadoClienteBLHouseDTO> ListaAcuerdoComercialEscalonadoClienteBLHouse { get; set; }
        public List<AcuerdoComercialEscalonadoAgenteBLHouseDTO> ListaAcuerdoComercialEscalonadoAgenteBLHouse { get; set; }
        public List<AcuerdoComercialEscalonadoServicioNaveDTO> ListaAcuerdoComercialEscalonadoServicioNave { get; set; }
        public List<AcuerdoComercialEscalonadoServicioBLDTO> ListaAcuerdoComercialEscalonadoServicioBL { get; set; }
        public List<AcuerdoComercialEscalonadoCargaDTO> ListaAcuerdoComercialEscalonadoCarga { get; set; }
        public List<AcuerdoComercialEscalonadoTarifaDTO> ListaAcuerdoComercialEscalonadoTarifa { get; set; }
        public List<AcuerdoComercialEscalonadoTarifaPeriodoDTO> ListaAcuerdoComercialEscalonadoTarifaPeriodo { get; set; }
        public List<AcuerdoComercialEscalonadoTarifaLigadaDTO> ListaAcuerdoComercialEscalonadoTarifaLigada { get; set; }

        public List<AcuerdoComercialEscalonadoMatchCodeDTO> ListaAcuerdoComercialEscalonadoMatchCode { get; set; }

        public List<AcuerdoComercialEscalonadoPartidaArancelariaDTO> ListaAcuerdoComercialEscalonadoPartidaArancelaria { get; set; }


        public DetalleAcuerdoComercialEscalonadoDTO()
        {
            ListaAcuerdoComercialEscalonadoSucursal = new List<AcuerdoComercialEscalonadoSucursalDTO>();
            ListaAcuerdoComercialEscalonadoSucursalTerminal = new List<AcuerdoComercialEscalonadoSucursalTerminalDTO>();
            ListaAcuerdoComercialEscalonadoRA = new List<AcuerdoComercialEscalonadoRADTO>();
            ListaAcuerdoComercialEscalonadoPuerto = new List<AcuerdoComercialEscalonadoPuertoDTO>();
            ListaAcuerdoComercialEscalonadoClienteBLMaster = new List<AcuerdoComercialEscalonadoClienteBLMasterDTO>();
            ListaAcuerdoComercialEscalonadoAgenteBLMaster = new List<AcuerdoComercialEscalonadoAgenteBLMasterDTO>();
            ListaAcuerdoComercialEscalonadoClienteBLHouse = new List<AcuerdoComercialEscalonadoClienteBLHouseDTO>();
            ListaAcuerdoComercialEscalonadoAgenteBLHouse = new List<AcuerdoComercialEscalonadoAgenteBLHouseDTO>();
            ListaAcuerdoComercialEscalonadoServicioNave = new List<AcuerdoComercialEscalonadoServicioNaveDTO>();
            ListaAcuerdoComercialEscalonadoServicioBL = new List<AcuerdoComercialEscalonadoServicioBLDTO>();
            ListaAcuerdoComercialEscalonadoCarga = new List<AcuerdoComercialEscalonadoCargaDTO>();
            ListaAcuerdoComercialEscalonadoTarifa = new List<AcuerdoComercialEscalonadoTarifaDTO>();
            ListaAcuerdoComercialEscalonadoTarifaPeriodo = new List<AcuerdoComercialEscalonadoTarifaPeriodoDTO>();
            ListaAcuerdoComercialEscalonadoTarifaLigada = new List<AcuerdoComercialEscalonadoTarifaLigadaDTO>();
            ListaAcuerdoComercialEscalonadoMatchCode = new List<AcuerdoComercialEscalonadoMatchCodeDTO>();
        }

        
    }
}