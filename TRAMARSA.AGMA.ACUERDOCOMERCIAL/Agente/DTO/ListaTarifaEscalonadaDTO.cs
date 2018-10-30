using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ListaTarifaEscalonadaDTO
    {
        public int CodigoTarifaEscalonada { get; set; }
        public string CodigoRegimen { get; set; }
        public string CodigoConcepto { get; set; }
        public string CodigoTarifa { get; set; }
        public decimal Precio { get; set; }
        public string CodigoMoneda { get; set; }
        public string CodigoTipoContenedor { get; set; }
        //public string TipoContenedor { get; set; }
        public string EstadoRegistro { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string DescripcionTarifa { get; set; }
        public string DescripcionMoneda { get; set; }
        public string CodigoUnidadCalculo { get; set; }
        public string UnidadCalculo { get; set; }

       
    }
}