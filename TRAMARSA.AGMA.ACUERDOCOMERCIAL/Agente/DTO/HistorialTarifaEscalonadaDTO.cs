using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class HistorialTarifaEscalonadaDTO
    {
        public int CodigoTarifaEscalonadaHistorial { get; set; }
        public int CodigoTarifaEscalonada { get; set; }
        public string Usuario { get; set; }
        public DateTime FechaHora { get; set; }
        public string Accion { get; set; }
        public string Descripcion { get; set; }
    }
}