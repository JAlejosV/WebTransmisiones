using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Moneda
{
    public class RequestRegistrarMonedaViewModel : RequestBaseDTO
    {
        public Int64? CodigoMoneda { get; set; }
        public string CodigoMonedaSunat { get; set; }
        public string NombreMoneda { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}