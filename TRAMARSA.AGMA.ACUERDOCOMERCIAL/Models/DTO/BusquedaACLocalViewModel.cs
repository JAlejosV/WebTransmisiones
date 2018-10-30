using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class BusquedaACLocalViewModel
    {
        [Display(Name = @"El Código Línea")]
        [Required(ErrorMessage = @"El Código Línea es requerido.")]
        public string CodigoLinea { get; set; }
        public int? CodigoAcuerdoComercialLocal { get; set; }
        public string CodigoRA { get; set; }
        public string NumeroBL { get; set; }
        public string CodigoCliente { get; set; }
        public string CodigoContenedor { get; set; }
        //public string CodigoRolSAP { get; set; }
        public List<string> ListaRolSAP { get; set; }
    }

}