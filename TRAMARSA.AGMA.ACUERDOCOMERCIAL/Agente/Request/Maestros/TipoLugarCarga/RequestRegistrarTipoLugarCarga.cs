using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.TipoLugarCarga
{
    public class RequestRegistrarTipoLugarCarga
    {
        public Int64? CodigoTipoLugarCarga { get; set; }
        public Int16? CodigoTipoLugarCargaSunat { get; set; }
        public string NombreTipoLugarCarga { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}