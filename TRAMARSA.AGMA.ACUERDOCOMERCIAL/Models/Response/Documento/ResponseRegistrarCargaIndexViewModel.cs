using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response.Documento
{
    public class ResponseRegistrarCargaIndexViewModel
    {
        public List<ListaCondicionesCargaViewModel> CondicionesCarga { get; set; }
        public List<ListaTemperaturasViewModel> Temperaturas { get; set; }
        public List<ListaCondicionesTransporteViewModel> CondicionesTransporte { get; set; }
    }
}