using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.ConfiguracionLinea.Response
{
    public class ResponseObtenerConfiguracionLineaDTO
    {
        public ResponseObtenerConfiguracionLineaDTO()
        {
            this.Result = new Result();
            ListaConfiguracionSucursal = new List<ConfiguracionLineaSucursalDTO>();
            ListaConfiguracionSucursalTerminal = new List<ConfiguracionLineaSucursalTerminalDTO>();
            ListaConfiguracionSeccionConcesionLocal = new List<ConfiguracionLineaPantallaSeccionDTO>();
            ListaConfiguracionSeccionConcesionEscalonada = new List<ConfiguracionLineaPantallaSeccionDTO>();
            ListaConfiguracionSeccionAdmConcesionLocal = new List<ConfiguracionLineaPantallaSeccionDTO>();
            ListaConfiguracionSeccionAdmConcesionEscalonada = new List<ConfiguracionLineaPantallaSeccionDTO>();
        }
        public Result Result { get; set; }
        public int CodigoConfiguracion { get; set; }
        public string CodigoLinea { get; set; }
        public List<ConfiguracionLineaSucursalDTO> ListaConfiguracionSucursal { get; set; }
        public List<ConfiguracionLineaSucursalTerminalDTO> ListaConfiguracionSucursalTerminal { get; set; }
        public List<ConfiguracionLineaPantallaSeccionDTO> ListaConfiguracionSeccionConcesionLocal { get; set; }
        public List<ConfiguracionLineaPantallaSeccionDTO> ListaConfiguracionSeccionConcesionEscalonada { get; set; }
        public List<ConfiguracionLineaPantallaSeccionDTO> ListaConfiguracionSeccionAdmConcesionLocal { get; set; }
        public List<ConfiguracionLineaPantallaSeccionDTO> ListaConfiguracionSeccionAdmConcesionEscalonada { get; set; }

    }
}