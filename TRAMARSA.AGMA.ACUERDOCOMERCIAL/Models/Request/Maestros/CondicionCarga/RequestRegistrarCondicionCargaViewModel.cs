using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.CondicionCarga
{
    public class RequestRegistrarCondicionCargaViewModel : RequestBaseDTO
    {
        public Int64? CodigoCondicionCarga { get; set; }
        public string CodigoCondicionCargaSunat { get; set; }
        public string NombreCondicionCarga { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}