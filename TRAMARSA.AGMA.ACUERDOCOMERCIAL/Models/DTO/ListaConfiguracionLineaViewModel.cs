using System;
namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ListaConfiguracionLineaViewModel
    {
        public int? CodigoConfiguracion { get; set; }
        public string CodigoLinea { get; set; }
        public string DescripcionLinea { get; set; }
        public string UsuarioCreacion { get; set; }
        public string FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string FechaHoraActualizacion { get; set; }
        public bool EstadoRegistro { get; set; }
        public string  DescripcionEstado { get; set; }

    }
}