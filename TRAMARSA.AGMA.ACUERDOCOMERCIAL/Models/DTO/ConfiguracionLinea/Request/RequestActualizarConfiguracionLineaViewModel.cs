using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.ConfiguracionLinea.Request
{
    public class RequestActualizarConfiguracionLineaViewModel
    {

        public RequestActualizarConfiguracionLineaViewModel()
        {
            ListaConfiguracionSucursal = new List<ConfiguracionLineaSucursalViewModel>();
            ListaConfiguracionSucursalTerminal = new List<ConfiguracionLineaSucursalTerminalViewModel>();
            ListaConfiguracionSeccionConcesionLocal = new List<ConfiguracionLineaPantallaSeccionViewModel>();
            ListaConfiguracionSeccionConcesionEscalonada = new List<ConfiguracionLineaPantallaSeccionViewModel>();
            ListaConfiguracionSeccionAdmConcesionLocal = new List<ConfiguracionLineaPantallaSeccionViewModel>();
            ListaConfiguracionSeccionAdmConcesionEscalonada = new List<ConfiguracionLineaPantallaSeccionViewModel>();

        }
        public int CodigoConfiguracion { get; set; }
        public string CodigoLinea { get; set; }
        public string UsuarioRegistro { get; set; }
        public DateTime FechaHoraRegistro { get; set; }
        public string Accion { get; set; }
        public List<ConfiguracionLineaSucursalViewModel> ListaConfiguracionSucursal { get; set; }
        public List<ConfiguracionLineaSucursalTerminalViewModel> ListaConfiguracionSucursalTerminal { get; set; }
        public List<ConfiguracionLineaPantallaSeccionViewModel> ListaConfiguracionSeccionConcesionLocal { get; set; }
        public List<ConfiguracionLineaPantallaSeccionViewModel> ListaConfiguracionSeccionConcesionEscalonada { get; set; }
        public List<ConfiguracionLineaPantallaSeccionViewModel> ListaConfiguracionSeccionAdmConcesionLocal { get; set; }
        public List<ConfiguracionLineaPantallaSeccionViewModel> ListaConfiguracionSeccionAdmConcesionEscalonada { get; set; }

    }
}