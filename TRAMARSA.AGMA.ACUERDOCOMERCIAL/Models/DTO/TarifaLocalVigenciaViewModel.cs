using System;
using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class TarifaLocalVigenciaViewModel
    {
        public int CodigoTarifaLocalVigencia { get; set; }
        public int CodigoTarifaLocal { get; set; }
        public DateTime? InicioVigencia { get; set; }
        public string CodigoMoneda { get; set; }
        public decimal Monto { get; set; }
        public string Accion { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public bool EstadoRegistro { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }

        public List<TarifaLocalLigadaViewModel> ListaTarifaLocalLigada { get; set; }
    }
}