using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.ConfiguracionLinea;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseObtenerConfiguracionLineaViewModel
    {
        public Result Result { get; set; }
        public ResponseObtenerConfiguracionLineaViewModel()
        {
            this.Result = new Result();
            ListaConfiguracionSucursal = new List<ConfiguracionLineaSucursalViewModel>();
            ListaConfiguracionSucursalTerminal = new List<ConfiguracionLineaSucursalTerminalViewModel>();
            ListaConfiguracionSeccionConcesionLocal = new List<ConfiguracionLineaPantallaSeccionViewModel>();
            ListaConfiguracionSeccionConcesionEscalonada = new List<ConfiguracionLineaPantallaSeccionViewModel>();
            ListaConfiguracionSeccionAdmConcesionLocal = new List<ConfiguracionLineaPantallaSeccionViewModel>();
            ListaConfiguracionSeccionAdmConcesionEscalonada = new List<ConfiguracionLineaPantallaSeccionViewModel>();
        }
        public int CodigoConfiguracion { get; set; }
        public string CodigoLinea { get; set; }
        public List<ConfiguracionLineaSucursalViewModel> ListaConfiguracionSucursal { get; set; }
        public List<ConfiguracionLineaSucursalTerminalViewModel> ListaConfiguracionSucursalTerminal { get; set; }
        public List<ConfiguracionLineaPantallaSeccionViewModel> ListaConfiguracionSeccionConcesionLocal { get; set; }
        public List<ConfiguracionLineaPantallaSeccionViewModel> ListaConfiguracionSeccionConcesionEscalonada { get; set; }
        public List<ConfiguracionLineaPantallaSeccionViewModel> ListaConfiguracionSeccionAdmConcesionLocal { get; set; }
        public List<ConfiguracionLineaPantallaSeccionViewModel> ListaConfiguracionSeccionAdmConcesionEscalonada { get; set; }

    }
}