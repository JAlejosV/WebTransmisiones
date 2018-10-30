using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class AcuerdoComercialEscalonadoHistorialDTO
    {
        public int CodigoAcuerdoComercialEscalonadoHistorial { get; set; }
        public int CodigoAcuerdoComercialEscalonado { get; set; }
        public string Usuario { get; set; }
        public DateTime FechaHora { get; set; }
        public string Accion { get; set; }
        public string Descripcion { get; set; }
    }
}