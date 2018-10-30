using System.ComponentModel.DataAnnotations;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class BusquedaPuertoViewModel2
    {
        public string CodigoPuerto { get; set; }
        public string CodigoLineaNaviera { get; set; }
        public string NombrePuerto { get; set; }

        public string CodigoSeccionPuerto { get; set; }
        public int CodigoGrupoPuerto { get; set; }
        public string NombreGrupoPuerto { get; set; }
        public string CodigoLinea { get; set; }
        public string Tipo { get; set; }
    }
}