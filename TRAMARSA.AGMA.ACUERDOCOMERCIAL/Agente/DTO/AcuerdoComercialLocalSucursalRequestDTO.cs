using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class AcuerdoComercialLocalSucursalRequestDTO
    {
        public int? CodigoAcuerdoComercialLocal { get; set; }
        public string CodigoSucursal { get; set; }
        public string Accion { get; set; }
    }
}