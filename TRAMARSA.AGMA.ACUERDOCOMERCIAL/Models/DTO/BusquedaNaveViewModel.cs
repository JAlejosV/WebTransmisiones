using System.ComponentModel.DataAnnotations;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class BusquedaNaveViewModel
    {
        //[Display(Name = @"Cod. Nave")]
        //[Required(ErrorMessage = @"El {0} es requerido.")]
        //[StringLength(3, ErrorMessage = @"El {0} no puede ser mayor de 3 caracteres")]
        public string Codigo { get; set; }

        //[Display(Name = @"Nombre Nave")]
        //[StringLength(40, ErrorMessage = @"El {0} no puede ser mayor de 40 caracteres")]
        public string Nombre { get; set; }

        //[Display(Name = @"Nro. Viaje")]
        //[Required(ErrorMessage = @"El {0} es requerido.")]
        //[StringLength(6, ErrorMessage = @"El {0} no puede ser mayor de 6 caracteres")]
        public string NumeroViaje { get; set; }
    }
}