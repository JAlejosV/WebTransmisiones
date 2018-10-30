using System.ComponentModel.DataAnnotations;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class HistorialACLocalViewModel
    {
        [Display(Name = @"CodigoAcuerdoComercialLocal")]
        [Required(ErrorMessage = @"El código de Acuerdo Comercial Local es requerido.")]
        public string CodigoAcuerdoComercialLocal { get; set; }
    }
}