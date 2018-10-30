using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.ConfiguracionLinea;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class RegistrarConfiguracionLineaIndexViewModel
    {

        public RegistrarConfiguracionLineaIndexViewModel()
        {
            Linea = new List<ListaLineaViewModel>();
            Sucursal = new List<ListaSucursalViewModel>();
            TerminalPorturario = new List<ListaTerminalPortuarioViewModel>();

            ListaConfiguracionSeccionConcesionLocal = new List<ConfiguracionLineaPantallaSeccionViewModel>();
            ListaConfiguracionSeccionConcesionEscalonada = new List<ConfiguracionLineaPantallaSeccionViewModel>();
            ListaConfiguracionSeccionAdmConcesionLocal = new List<ConfiguracionLineaPantallaSeccionViewModel>();
            ListaConfiguracionSeccionAdmConcesionEscalonada = new List<ConfiguracionLineaPantallaSeccionViewModel>();
        }

        public List<ListaLineaViewModel> Linea { get; set; }
        public List<ListaSucursalViewModel> Sucursal { get; set; }
        public List<ListaTerminalPortuarioViewModel> TerminalPorturario { get; set; }

        public List<ConfiguracionLineaPantallaSeccionViewModel> ListaConfiguracionSeccionConcesionLocal { get; set; }
        public List<ConfiguracionLineaPantallaSeccionViewModel> ListaConfiguracionSeccionConcesionEscalonada { get; set; }
        public List<ConfiguracionLineaPantallaSeccionViewModel> ListaConfiguracionSeccionAdmConcesionLocal { get; set; }
        public List<ConfiguracionLineaPantallaSeccionViewModel> ListaConfiguracionSeccionAdmConcesionEscalonada { get; set; }

    }
}