using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GR.Msc.Memberships.Agente.Response
{
    public class ResponseMenuPrincipalDTO
    {
        public string MenuPrincipal { get; set; }

        public string NombreUsuario { get; set; }

        public bool EsExterno { get; set; }
    }
}