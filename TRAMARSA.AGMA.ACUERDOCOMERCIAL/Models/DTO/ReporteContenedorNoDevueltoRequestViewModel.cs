using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ReporteContenedorNoDevueltoRequestViewModel
    {
        public string CodigoCliente { get; set; }
        public string CodigoLinea { get; set; }
        public string NombreCliente { get; set; }
        public string NombreLinea { get; set; }
        public string Nro_Bl { get; set; }
        public string CodigoCotenedor { get; set; }
        public DateTime? Desde { get; set; }
        public DateTime? Hasta { get; set; }
    }
}