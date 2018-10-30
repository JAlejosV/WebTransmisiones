using GR.Comun.DTO;
using GR.Msc.Memberships.Agente.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GR.Msc.Memberships.Models
{
    public class MenuDTO : Result
    {
        public List<ResponseOpcionUI> MenuIzquierdo { get; set; }
        public string NombreUsuario { get; set; }
        public string RolUsuario { get; set; }
        public string Email { get; set; }
        public string CodigoUsuario { get; set; }
    }
}