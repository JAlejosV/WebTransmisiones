using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.ConfiguracionLinea
{
    public class ConfiguracionLineaSucursalTerminalViewModel
    {
        public int CodigoConfiguracionLineaSucursalTerminal { get; set; }
        public int CodigoConfiguracion { get; set; }
        public string CodigoSucursal { get; set; }
        public string CodigoTerminalPortuario { get; set; }
        public string Accion { get; set; }
    }
}