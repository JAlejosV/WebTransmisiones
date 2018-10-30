using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.ConfiguracionLinea
{
    public class ConfiguracionLineaPantallaSeccionViewModel
    {
        public int CodigoConfiguracionLineaPantallaSeccion { get; set; }
        public int CodigoConfiguracion { get; set; }
        public string CodigoPantalla { get; set; }
        public string CodigoSeccion { get; set; }
        public bool SeccionVisible { get; set; }
        public string SeccionTitulo { get; set; }
        public string TipoControl { get; set; }
        public string Accion { get; set; }
    }
}