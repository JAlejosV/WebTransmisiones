using System;
using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class TarifaEscalonadaVigenciaDTO
    {
        public int CodigoTarifaEscalonadaVigencia { get; set; }
        public int CodigoTarifaEscalonada { get; set; }
        public DateTime InicioVigencia { get; set; }
        public string CodigoTipoFechaCalculo { get; set; }
        public int DiasDelayCalculo { get; set; }
        public string CodigoTipoDiaCalculo { get; set; }
        public string CodigoTipoCobro { get; set; }
        public string UsuarioCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public bool EstadoRegistro { get; set; }
        public string Accion { get; set; }
    }
}