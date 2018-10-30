using System.ComponentModel.DataAnnotations;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ConsultarDetalleAcuerdoComercialEscalonadoViewModel
    {
        [Display(Name = @"CodigoAcuerdoComercialEscalonado")]
        [Required(ErrorMessage = @"El Codigo Acuerdo Comercial Escalonado es requerido.")]
        public int CodigoAcuerdoComercialEscalonado { get; set; }
    }
}