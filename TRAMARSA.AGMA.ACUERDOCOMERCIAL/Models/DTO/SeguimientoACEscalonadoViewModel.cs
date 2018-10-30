using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class SeguimientoACEscalonadoViewModel
    {
        [Display(Name = @"El Código Línea")]
        [Required(ErrorMessage = @"El Código Línea es requerido.")]
        public string CodigoLinea { get; set; }
        public int? CodigoAcuerdoComercialEscalonado { get; set; }
        public string CodigoRA { get; set; }
        public string NumeroBL { get; set; }
        //public string CodigoRol { get; set; }
        public List<string> ListaRolSAP { get; set; }
        public string Estado { get; set; }
        public string CodigoCliente { get; set; }
        public string CodigoContenedor { get; set; }
        public string UsuarioCreacion { get; set; }
        public string UsuarioAprobacion { get; set; }
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
    }
}