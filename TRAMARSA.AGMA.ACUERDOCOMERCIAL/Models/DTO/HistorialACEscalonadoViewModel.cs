using System.ComponentModel.DataAnnotations;
namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class HistorialACEscalonadoViewModel
    {
        [Display(Name = @"CodigoAcuerdoComercialEscalonado")]
        [Required(ErrorMessage = @"El código de Acuerdo Comercial Escalonado es requerido.")]
        public string CodigoAcuerdoComercialEscalonado { get; set; }
    }
}