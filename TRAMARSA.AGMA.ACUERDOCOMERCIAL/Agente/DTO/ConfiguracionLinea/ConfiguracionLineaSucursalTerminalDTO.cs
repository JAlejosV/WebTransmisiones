using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ConfiguracionLineaSucursalTerminalDTO
    {
        public int CodigoConfiguracionLineaSucursalTerminal { get; set; }
        public int CodigoConfiguracion { get; set; }
        public string CodigoSucursal { get; set; }
        public string CodigoTerminalPortuario { get; set; }
        public string Accion { get; set; }
    }
}