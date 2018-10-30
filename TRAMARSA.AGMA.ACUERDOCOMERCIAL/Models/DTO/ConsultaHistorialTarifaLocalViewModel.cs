using System.ComponentModel.DataAnnotations;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ConsultaHistorialTarifaLocalViewModel
    {
        [Display(Name = @"CodigoTarifaLocal")]
        [Required(ErrorMessage = @"El Codigo Tarifa Local es requerido.")]
        public string CodigoTarifaLocal { get; set; }
    }
}