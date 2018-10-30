using System.ComponentModel.DataAnnotations;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class DetalleAcuerdoComercialViewModel
    {
        [Display(Name = "Codigo Tarifa Local")]
        [Required(ErrorMessage = "El Codigo Acuerdo Comercial Local es requerido.")]
        public int CodigoAcuerdoComercialLocal { get; set; }
    }
}