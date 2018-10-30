using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Maestros.Temperatura
{
    public class RequestRegistrarTemperaturaViewModel : RequestBaseDTO
    {
        public Int64? CodigoTemperatura { get; set; }
        public string CodigoTemperaturaSunat { get; set; }
        public string NombreTemperatura { get; set; }
        public string UsuarioRegistro { get; set; }
        public string Accion { get; set; }
    }
}