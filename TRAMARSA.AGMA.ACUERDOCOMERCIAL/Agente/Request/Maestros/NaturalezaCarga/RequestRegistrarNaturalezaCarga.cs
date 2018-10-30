using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request.Maestros.NaturalezaCarga
{
    public class RequestRegistrarNaturalezaCarga
    {
        public Int64? CodigoNaturalezaCarga { get; set; }
        public string CodigoNaturalezaCargaSunat { get; set; }
        public string NombreNaturalezaCarga { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}