using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class BusquedaACEscalonadoViewModel
    {
        [Display(Name = @"El Código Línea")]
        [Required(ErrorMessage = @"El Código Línea es requerido.")]
        public string CodigoLinea { get; set; }
        public int? CodigoAcuerdoComercialEscalonado { get; set; }
        public string CodigoRA { get; set; }
        public string NumeroBL { get; set; }
        public string CodigoCliente { get; set; }
        public string CodigoContenedor { get; set; }
        //public string CodigoRolSAP { get; set; }
        public List<string> ListaRolSAP { get; set; }
    }
}