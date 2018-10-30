using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GR.Msc.Memberships.Agente.Request
{
    public enum TipoCambioClave
    {
        Sys = 0,
        Ui = 1
    }
    public class RequestCambioClave
    {
        public TipoCambioClave TipoCambioClave { get; set; }
        public string CodigoUsuario { get; set; }
        public string ClaveAntigua { get; set; }
        public string ClaveNueva { get; set; }
        public string ClaveNuevaConfirmada { get; set; }
        public string Dominio { get; set; }
        public string Acronimo { get; set; }
    }
}