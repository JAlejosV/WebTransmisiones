namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class AcuerdoComercialLocalClienteBLMasterRequestDTO
    {

        public int? CodigoAcuerdoComercialLocal { get; set; }
        public string CodigoCliente { get; set; }
        public string NombreInterlocutor { get; set; }
        public string CodigoDocumentoCliente { get; set; }
        //public string CodigoTipoCondicion { get; set; }
        public int? CodigoRol { get; set; }
        public string Rol { get; set; }
        public string Accion { get; set; }

    }
}