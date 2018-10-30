namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.TarifaEscalonada
{
    public class ConsultaDetalleTarifaEscalonadaVigenciaViewModel
    {
        public int CodigoTarifaEscalonadaVigencia { get; set; }
        public int CodigoTarifaEscalonada { get; set; }
        public string InicioVigencia { get; set; }
        public string CodigoTipoFechaCalculo { get; set; }
        public int DiasDelayCalculo { get; set; }
        public string CodigoTipoDiaCalculo { get; set; }
        public string CodigoTipoCobro { get; set; }
        public string UsuarioCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public string FechaHoraCreacion { get; set; }
        public string FechaHoraActualizacion { get; set; }
        public bool EstadoRegistro { get; set; }
        public string Accion { get; set; }
    }
}