using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros
{
    public class TipoContenedorDTO
    {
        public Int64? CodigoTipoContenedor { get; set; }
        public string CodigoIsoTipoContenedor { get; set; }
        public string CodigoIsoGrupoTipoContenedor { get; set; }
        public string NombreTipoContenedor { get; set; }
        public string CodigoAduanaTipoContenedor { get; set; }
        public string CodTipoContenedor { get; set; }
        public string TamanioTipoContenedor { get; set; }
        public string IsoTipoContenedor { get; set; }
        public bool EstadoRegistro { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
    }
}