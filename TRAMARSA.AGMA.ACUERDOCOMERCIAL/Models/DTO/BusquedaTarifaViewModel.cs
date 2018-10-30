using System.ComponentModel.DataAnnotations;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class BusquedaTarifaViewModel
    {
        [Display(Name = "Código Linea")]
        [Required(ErrorMessage = "El Código Linea es requerido.")]
        public string CodigoLinea { get; set; }
        public string CodigoRegimen { get; set; }
        public string CodigoConcepto { get; set; }
        public string CodigoTarifa { get; set; }
        public string DescripcionTarifa { get; set; }
    }
}