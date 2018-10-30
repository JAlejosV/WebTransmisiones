using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.CondicionContrato
{
    public class RequestRegistrarCondicionContratoViewModel : RequestBaseDTO
    {
        public Int64? CodigoCondicionContrato { get; set; }
        public string CodigoCondicionContratoSunat { get; set; }
        public string NombreCondicionContrato { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}