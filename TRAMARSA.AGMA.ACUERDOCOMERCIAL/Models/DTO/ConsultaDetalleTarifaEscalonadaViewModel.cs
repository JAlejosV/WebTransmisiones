using System.ComponentModel.DataAnnotations;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ConsultaDetalleTarifaEscalonadaViewModel
    {
        [Display(Name = "Codigo Tarifa Escalonada")]
        [Required(ErrorMessage = "El Codigo Tarifa Escalonada es requerido.")]
        public int CodigoTarifaEscalonada { get; set; }
    }
}