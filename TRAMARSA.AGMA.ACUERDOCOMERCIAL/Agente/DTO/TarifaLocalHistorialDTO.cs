using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class TarifaLocalHistorialDTO
    {
        public int CodigoTarifaLocalHistorial { get; set; }
        public int CodigoTarifaLocal { get; set; }
        public string Usuario { get; set; }
        public DateTime FechaHora { get; set; }
        public string Accion { get; set; }
        public string Descripcion { get; set; }
    }
}