using System;
using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.AcuerdoComercial;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequestRegistrarAcuerdoComercialEscalonadoViewModel
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
        public string CodigoTipoCondicion { get; set; }

        public List<AcuerdoComercialEscalonadoSucursalViewModel> ListaAcuerdoComercialEscalonadoSucursal { get; set; }
        public List<AcuerdoComercialEscalonadoSucursalTerminalViewModel> ListaAcuerdoComercialEscalonadoSucursalTerminal { get; set; }
        public List<AcuerdoComercialEscalonadoRAViewModel> ListaAcuerdoComercialEscalonadoRA { get; set; }
        public List<AcuerdoComercialEscalonadoPuertoViewModel> ListaAcuerdoComercialEscalonadoPuerto { get; set; }
        public List<AcuerdoComercialEscalonadolClienteBLMasterViewModel> ListaAcuerdoComercialEscalonadoClienteBLMaster { get; set; }
        public List<AcuerdoComercialEscalonadoAgenteBLMasterViewModel> ListaAcuerdoComercialEscalonadoAgenteBLMaster { get; set; }
        public List<AcuerdoComercialEscalonadoClienteBLHouseViewModel> ListaAcuerdoComercialEscalonadoClienteBLHouse { get; set; }
        public List<AcuerdoComercialEscalonadoAgenteBLHouseRequestViewModel> ListaAcuerdoComercialEscalonadoAgenteBLHouse { get; set; }
        public List<AcuerdoComercialEscalonadoServicioNaveViewMode> ListaAcuerdoComercialEscalonadoServicioNave { get; set; }
        public List<AcuerdoComercialEscalonadoServicioBLViewModel> ListaAcuerdoComercialEscalonadoServicioBL { get; set; }
        public List<AcuerdoComercialEscalonadoCargaViewModel> ListaAcuerdoComercialEscalonadoCarga { get; set; }
        public List<AcuerdoComercialEscalonadoTarifaViewModel> ListaAcuerdoComercialEscalonadoTarifa { get; set; }
        public List<AcuerdoComercialEscalonadoTarifaPeriodoViewModel> ListaAcuerdoComercialEscalonadoTarifaPeriodo { get; set; }
        public List<AcuerdoComercialEscalonadoTarifaLigadaViewModel> ListaAcuerdoComercialEscalonadoTarifaLigada { get; set; }

        public List<AcuerdoComercialEscalonadoMatchCodeViewModel> ListaAcuerdoComercialEscalonadoMatchCode { get; set; }
        public List<AcuerdoComercialEscalonadoPartidaArancelariaViewModel> ListaAcuerdoComercialEscalonadoPartidaArancelaria { get; set; }

        public RequestRegistrarAcuerdoComercialEscalonadoViewModel()
        {
            ListaAcuerdoComercialEscalonadoSucursal = new List<AcuerdoComercialEscalonadoSucursalViewModel>();
            ListaAcuerdoComercialEscalonadoSucursalTerminal = new List<AcuerdoComercialEscalonadoSucursalTerminalViewModel>();
            ListaAcuerdoComercialEscalonadoRA = new List<AcuerdoComercialEscalonadoRAViewModel>();
            ListaAcuerdoComercialEscalonadoPuerto = new List<AcuerdoComercialEscalonadoPuertoViewModel>();
            ListaAcuerdoComercialEscalonadoClienteBLMaster = new List<AcuerdoComercialEscalonadolClienteBLMasterViewModel>();
            ListaAcuerdoComercialEscalonadoAgenteBLMaster = new List<AcuerdoComercialEscalonadoAgenteBLMasterViewModel>();
            ListaAcuerdoComercialEscalonadoClienteBLHouse = new List<AcuerdoComercialEscalonadoClienteBLHouseViewModel>();
            ListaAcuerdoComercialEscalonadoAgenteBLHouse = new List<AcuerdoComercialEscalonadoAgenteBLHouseRequestViewModel>();
            ListaAcuerdoComercialEscalonadoServicioNave = new List<AcuerdoComercialEscalonadoServicioNaveViewMode>();
            ListaAcuerdoComercialEscalonadoServicioBL = new List<AcuerdoComercialEscalonadoServicioBLViewModel>();
            ListaAcuerdoComercialEscalonadoCarga = new List<AcuerdoComercialEscalonadoCargaViewModel>();
            ListaAcuerdoComercialEscalonadoTarifa = new List<AcuerdoComercialEscalonadoTarifaViewModel>();
            ListaAcuerdoComercialEscalonadoTarifaPeriodo = new List<AcuerdoComercialEscalonadoTarifaPeriodoViewModel>();
            ListaAcuerdoComercialEscalonadoTarifaLigada = new List<AcuerdoComercialEscalonadoTarifaLigadaViewModel>();

            ListaAcuerdoComercialEscalonadoMatchCode = new List<AcuerdoComercialEscalonadoMatchCodeViewModel>();
            ListaAcuerdoComercialEscalonadoPartidaArancelaria = new List<AcuerdoComercialEscalonadoPartidaArancelariaViewModel>();

        }
    }
}