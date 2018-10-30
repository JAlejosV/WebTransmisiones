using System.ComponentModel.DataAnnotations;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class BusquedaDocumentoOrigenViewModel
    {
        public string CodNave { get; set; }
        public string NumViaje { get; set; }
        public string PuertoOrigen { get; set; }
        public string PuertoEmbarque { get; set; }
        public string PuertoDesembarque { get; set; }
        public string DestinoFinal { get; set; }
        [Display(Name = @"El Código Línea")]
        [Required(ErrorMessage = @"El Código Línea es requerido.")]
        public string CodLinea { get; set; }
        public string NroBL { get; set; }
        [Display(Name = @"Tipo BL Línea")]
        [Required(ErrorMessage = @"El Tipo BL es requerido.")]
        public string TipoBL { get; set; }
        public string CodContenedor { get; set; }
        public string TipoDocumento { get; set; }
        public string NroBkn { get; set; }
    }
}