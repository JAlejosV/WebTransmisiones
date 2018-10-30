using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GR.Msc.Memberships.Agente.Response
{
    public class ResponseCambioClave
    {
        public ResponseCambioClave()
        {
            this.Result = new Result();
        }

        public Result Result { get; set; }
        public string Correo { get; set; }
        public string Nombres { get; set; }
        public string CodigoUsuario { get; set; }
    }
}