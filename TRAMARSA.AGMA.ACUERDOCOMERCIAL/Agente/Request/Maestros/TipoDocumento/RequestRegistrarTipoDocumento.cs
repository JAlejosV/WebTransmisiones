using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoDocumento
{
    public class RequestRegistrarTipoDocumento
    {
        public Int64? CodigoTipoDocumento { get; set; }
        public Int16? CodigoTipoDocumentoSunat { get; set; }
        public string NombreTipoDocumento { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}