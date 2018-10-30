using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class LiquidacionesNoDevueltasDTO
    {
        public string CodigoAgente { get; set; }
        public string CodigoContenedor { get; set; }
        public string CodigoLinea { get; set; }
        public string CodigoNave { get; set; }
        public string Consignatario { get; set; }
        public int DiasSobrantes { get; set; }
        public DateTime FechaArribo { get; set; }
        public DateTime? FechaIDP { get; set; }
        public DateTime FechaTransaccion { get; set; }
        public string NombreNave { get; set; }
        public string NombreSucursal { get; set; }
        public string Notificante { get; set; }
        public string NumeroBL { get; set; }
        public string NumeroTransaccion { get; set; }
        public string NumeroViaje { get; set; }
        public string PuertoDescarga { get; set; }
        public string PuertoEmbarque { get; set; }
        public string PuertoFinal { get; set; }
        public string PuertoOrigen { get; set; }
        public string SerivicioBL { get; set; }
        public string TipoContenedor { get; set; }
        public DateTime? UDL { get; set; }
    }
}