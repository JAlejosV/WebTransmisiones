using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseRegistroNotificacionIndex
    {
        public List<ListaLineaViewModel> ListLinea { get; set; }
        public List<ListaDetalleCatalagoViewModel> ListTipoFrecuencia { get; set; }
        public string FechaToday { get; set; }
    }
}