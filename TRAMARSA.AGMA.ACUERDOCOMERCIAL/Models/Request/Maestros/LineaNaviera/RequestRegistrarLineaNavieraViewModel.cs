using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.LineaNaviera
{
    public class RequestRegistrarLineaNavieraViewModel
    {
        public Int64 CodigoLineaNaviera { get; set; }
        public string NombreLineaNaviera { get; set; }
        public string DireccionLineaNaviera { get; set; }
        public string RucLineaNaviera { get; set; }
        public string CodigoEquivalencia { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}