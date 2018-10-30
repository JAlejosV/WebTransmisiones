using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Documento
{
    public class ConsultarDetalleDocumentoViewModel
    {
        [Display(Name = @"CodigoDocumento")]
        [Required(ErrorMessage = @"El Codigo Documento es requerido.")]
        public long CodigoDocumento { get; set; }
    }
}