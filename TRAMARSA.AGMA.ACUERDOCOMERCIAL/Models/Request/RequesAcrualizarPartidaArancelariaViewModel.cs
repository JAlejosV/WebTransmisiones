using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request
{
    public class RequesAcrualizarPartidaArancelariaViewModel
    {
        public int IdPartidaArancelaria { get; set; }
        public string CodigoPartidaArancelaria { get; set; }
        public string DescripcionPartidaArancelaria { get; set; }
        public string UsuarioRegistro { get; set; }
        public DateTime? FechaHoraRegistro { get; set; }
        public string Accion { get; set; }
    }
}