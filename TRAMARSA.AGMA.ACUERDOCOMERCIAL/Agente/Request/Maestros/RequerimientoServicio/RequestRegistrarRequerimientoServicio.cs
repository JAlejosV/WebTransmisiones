using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.RequerimientoServicio
{
    public class RequestRegistrarRequerimientoServicio
    {
        public Int64? CodigoRequerimientoServicio { get; set; }
        public string CodigoRequerimientoServicioSunat { get; set; }
        public string NombreRequerimientoServicio { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}