using System;
using System.ComponentModel.DataAnnotations;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class BusquedaTarifaLocalViewModel
    {
        [Display(Name = "El Código Línea")]
        [Required(ErrorMessage = "El Código Línea es requerido.")]
        public string CodigoLinea { get; set; }
        public string DescripcionTarifa { get; set; }
        public string CodigoSucursal { get; set; }
        public string CodigoTerminalPortuario { get; set; }
        public bool FlagTarifaLigada { get; set; }
        public bool FlagVigente { get; set; }
        public DateTime? FechaVigencia { get; set; }
        
    }
}