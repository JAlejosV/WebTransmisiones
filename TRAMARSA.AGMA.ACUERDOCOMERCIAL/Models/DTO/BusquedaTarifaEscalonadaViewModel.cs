using System;
using System.ComponentModel.DataAnnotations;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class BusquedaTarifaEscalonadaViewModel
    {
        [Display(Name = "El Código Línea")]
        [Required(ErrorMessage = "El Código Línea es requerido.")]
        public string CodigoLinea { get; set; }
        public string DescripcionTarifa { get; set; }
        public string CodigoTipoContenedor { get; set; }
        public bool FlagTarifaLigada { get; set; }
        public bool FlagVigente { get; set; }
        public DateTime? FechaVigencia { get; set; }
    }
}