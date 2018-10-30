using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ListaTipoCambio
    {
        public string CodigoMoneda { get; set; }
        public decimal TipoCambioVenta { get; set; }
        public decimal TipoCambioCompra { get; set; }
        public DateTime FechaActual { get; set; }
        public DateTime FechaProceso { get; set; }
    }
}