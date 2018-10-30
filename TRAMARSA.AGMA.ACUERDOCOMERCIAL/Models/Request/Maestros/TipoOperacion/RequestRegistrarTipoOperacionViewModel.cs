using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.TipoOperacion
{
    public class RequestRegistrarTipoOperacionViewModel
    {
        public Int64? CodigoTipoOperacion { get; set; }
        public Byte? CodigoTipoOperacionSunat { get; set; }
        public string NombreTipoOperacion { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}