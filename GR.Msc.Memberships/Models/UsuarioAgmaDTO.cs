using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GR.Msc.Memberships.Models
{
    public class UsuarioAgmaDto:GR.Msc.Memberships.Models.UsuarioDTO
    {
        public List<string> ListaCodigosLineas { get; set; }
    }
}