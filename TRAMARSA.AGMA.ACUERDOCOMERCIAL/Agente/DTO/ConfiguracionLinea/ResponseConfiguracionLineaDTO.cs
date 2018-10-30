using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GR.Comun.DTO;
using GR.Msc.Memberships.Models;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ResponseConfiguracionLineaDTO
    {
        public ResponseConfiguracionLineaDTO()
        {
            ConfiguracionLinea  = new List<LineaConfiguracionDTO>();
            ConfiguracionLineaSucursal = new List<ConfiguracionLineaSucursalDTO>();
            ConfiguracionLineaSucursalTerminal = new List<ConfiguracionLineaSucursalTerminalDTO>();
            ConfiguracionLineaPantallaSeccion = new List<ConfiguracionLineaPantallaSeccionDTO>();
            Result = new Result();
        }
        public Result Result { get; set; }
        public List<LineaConfiguracionDTO> ConfiguracionLinea { get; set; }
        public List<ConfiguracionLineaSucursalDTO> ConfiguracionLineaSucursal { get; set; }
        public List<ConfiguracionLineaSucursalTerminalDTO> ConfiguracionLineaSucursalTerminal { get; set; }
        public List<ConfiguracionLineaPantallaSeccionDTO> ConfiguracionLineaPantallaSeccion { get; set; }
    }
}
