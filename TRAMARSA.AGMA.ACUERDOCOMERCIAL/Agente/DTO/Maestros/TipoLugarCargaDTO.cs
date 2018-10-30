using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros
{
    public class TipoLugarCargaDTO
    {
        public Int64? CodigoTipoLugarCarga { get; set; }
        public Int16? CodigoTipoLugarCargaSunat { get; set; }
        public string NombreTipoLugarCarga { get; set; }
        public bool EstadoRegistro { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
    }
}