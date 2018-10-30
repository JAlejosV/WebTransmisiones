using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Persona
{
    public class RequestConsultaRolViewModel : RequestBaseDTO
    {
        public PaginacionDTO paginacionDTO { get; set; }
        public RequestConsultaRolViewModel()
        {
            paginacionDTO = new PaginacionDTO();
        }
    }
}