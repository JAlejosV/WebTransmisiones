using System.ComponentModel.DataAnnotations;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class BusquedaDetalleCatalogoViewModel
    {
        [Display(Name = "Descripcion Catalogo")]
        [Required(ErrorMessage = "La descripción Catalogo es requerido.")]
        public string DescripcionCatalogo { get; set; }
    }
}