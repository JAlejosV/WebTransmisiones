using System.ComponentModel.DataAnnotations;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ConsultaHistorialTarifaEscalonadaViewModel
    {
        [Display(Name = @"CodigoTarifaEscalonada")]
        [Required(ErrorMessage = @"El Codigo Tarifa Escalonada es requerido.")]
        public string CodigoTarifaEscalonada { get; set; }
    }
}