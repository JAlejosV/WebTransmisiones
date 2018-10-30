using System.ComponentModel.DataAnnotations;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class DetalleTarifaLocalViewModel
    {
        [Display(Name = "Codigo Tarifa Local")]
        [Required(ErrorMessage = "El Codigo Tarifa Local es requerido.")]
        public int CodigoTarifaLocal { get; set; }
    }
}