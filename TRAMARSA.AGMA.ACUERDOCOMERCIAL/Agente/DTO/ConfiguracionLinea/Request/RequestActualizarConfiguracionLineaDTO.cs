using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.ConfiguracionLinea.Request
{
    public class RequestActualizarConfiguracionLineaDTO
    {

        public RequestActualizarConfiguracionLineaDTO()
        {
            ListaConfiguracionSucursal = new List<ConfiguracionLineaSucursalDTO>();
            ListaConfiguracionSucursalTerminal = new List<ConfiguracionLineaSucursalTerminalDTO>();
            ListaConfiguracionSeccion = new List<ConfiguracionLineaPantallaSeccionDTO>();
        }
        public int CodigoConfiguracion { get; set; }
        public string CodigoLinea { get; set; }
        public string UsuarioRegistro { get; set; }
        public DateTime FechaHoraRegistro { get; set; }
        public string Accion { get; set; }
        public List<ConfiguracionLineaSucursalDTO> ListaConfiguracionSucursal { get; set; }
        public List<ConfiguracionLineaSucursalTerminalDTO> ListaConfiguracionSucursalTerminal { get; set; }
        public List<ConfiguracionLineaPantallaSeccionDTO> ListaConfiguracionSeccion { get; set; }

    }
}