using System.ComponentModel.DataAnnotations;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class BusquedaDistribucionTarifaViewModel
    {
        [Display(Name = "CodigoConcepto")]
        [Required(ErrorMessage = "El Codigo Concepto es requerido.")]
        public string CodigoConcepto { get; set; }

        [Display(Name = "CodigoTarifa")]
        [Required(ErrorMessage = "El Codigo Tarifa es requerido.")]
        public string CodigoTarifa { get; set; }
    }
}