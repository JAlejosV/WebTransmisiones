using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Persona
{
    public class BusquedaPersonaViewModel
    {
        //[Display(Name = @"El Código Línea")]
        //[Required(ErrorMessage = @"El Código Línea es requerido.")]
        public Int64? CodigoPersona { get; set; }
        public string RazonSocialPersona { get; set; }
        public string NumeroDocumentoPersona { get; set; }
    }
}