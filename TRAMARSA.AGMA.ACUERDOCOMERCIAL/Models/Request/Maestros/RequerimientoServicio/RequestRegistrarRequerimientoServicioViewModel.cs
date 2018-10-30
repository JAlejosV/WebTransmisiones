using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.RequerimientoServicio
{
    public class RequestRegistrarRequerimientoServicioViewModel : RequestBaseDTO
    {
        public Int64? CodigoRequerimientoServicio { get; set; }
        public string CodigoRequerimientoServicioSunat { get; set; }
        public string NombreRequerimientoServicio { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}