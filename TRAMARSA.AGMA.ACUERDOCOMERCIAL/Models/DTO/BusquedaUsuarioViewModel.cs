using System.ComponentModel.DataAnnotations;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class BusquedaUsuarioViewModel
    {
        
        public string Nombre { get; set; }
        [Display(Name = @"Nombre Usuario")]
        [StringLength(200, ErrorMessage = @"El {0} no puede ser mayor de 200 caracteres")]
        public string NombreUsuario { get; set; }
        public string IdRol { get; set; }
        [Display(Name = @"Codigo Linea")]
        [Required(ErrorMessage = @"El Codigo Línea es requerido.")]
        public string CodigoLinea { get; set; }
        
    }
}