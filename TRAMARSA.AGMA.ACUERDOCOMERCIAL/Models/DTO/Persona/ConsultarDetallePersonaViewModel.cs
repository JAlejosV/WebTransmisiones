using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Persona
{
    public class ConsultarDetallePersonaViewModel
    {
        [Display(Name = @"CodigoPersona")]
        [Required(ErrorMessage = @"El Codigo Persona es requerido.")]
        public long CodigoPersona { get; set; }
    }
}