﻿namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.AcuerdoComercial
{
    public class AcuerdoComercialEscalonadoAgenteBLHouseRequestViewModel
    {
        public int? IdAgenteBLHome { get; set; }
        public int? CodigoAcuerdoComercialEscalonado { get; set; }
        public string CodigoAgente { get; set; }
        public string CodigoDocumentoAgente { get; set; }
        public int? CodigoRol { get; set; }
        public string NombreInterlocutor { get; set; }
        public string Accion { get; set; }
        public string Rol { get; set; }
    }
}