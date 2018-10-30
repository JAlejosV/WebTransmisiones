using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class AcuerdoComercialLocalClienteBLHouseRequestDTO
    {

        public int? CodigoAcuerdoComercialLocal { get; set; }
        public string CodigoCliente { get; set; }
        public string CodigoDocumentoCliente { get; set; }
        public int? CodigoRol { get; set; }
        public string CodigoCondicion { get; set; }
        public string Accion { get; set; }

        public string Rol { get; set; }
        public string NombreInterlocutor { get; set; }

    }
}