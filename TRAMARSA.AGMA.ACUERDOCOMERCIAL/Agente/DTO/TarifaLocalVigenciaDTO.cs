using System;
using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class TarifaLocalVigenciaDTO
    {

        public int CodigoTarifaLocalVigencia { get; set; }
        public int CodigoTarifaLocal { get; set; }
        public DateTime? InicioVigencia { get; set; }
        public string InicioVigenciaValor { get; set; }
        public string CodigoMoneda { get; set; }
        public decimal Monto { get; set; }
        public string Accion { get; set; }
        public bool EstadoRegistro { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public List<TarifaLocalLigadaDTO> ListaTarifaLocalLigada { get; set; }
    }
}