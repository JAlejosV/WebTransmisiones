using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class AcuerdoComercialLocalHistorialDTO
    {
        public int CodigoAcuerdoComercialLocalHistorial { get; set; }
        public int CodigoAcuerdoComercialLocal { get; set; }
        public string Usuario { get; set; }
        public DateTime FechaHora { get; set; }
        public string Accion { get; set; }
        public string Descripcion { get; set; }
    }
}