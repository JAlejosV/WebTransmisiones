namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.AcuerdoComercial
{
    public class AcuerdoComercialEscalonadoClienteBLHouseViewModel
    {
        public int? IdClienteBLHome { get; set; }
        public int? CodigoAcuerdoComercialEscalonado { get; set; }
        public string CodigoCliente { get; set; }
        public string CodigoDocumentoCliente { get; set; }
        public int? CodigoRol { get; set; }
        //public string CodigoCondicion { get; set; }
        public string NombreInterlocutor { get; set; }
        public string Rol { get; set; }
        public string Accion { get; set; }
    }
}