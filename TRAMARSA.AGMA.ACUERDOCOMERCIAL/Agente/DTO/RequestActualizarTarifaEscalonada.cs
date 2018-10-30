using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class RequestActualizarTarifaEscalonada
    {
        public int CodigoTarifaEscalonada { get; set; }
        public string CodigoRegimen { get; set; }
        public string CodigoTarifa { get; set; }
        public string CodigoConcepto { get; set; }
        public string CodigoLinea { get; set; }
        public string CodigoUnidadCalculo { get; set; }
        public string CodigoUsuarioAutorizador { get; set; }
        public string Usuario { get; set; }
        public string Accion { get; set; }
        public bool EstadoRegistro { get; set; }
        public bool ValidarTarifaEnAC { get; set; }
        public List<TarifaEscalonadaPeriodoDTO> ListaTarifaEscalonadaPeriodo  { get; set; }
        public List<TarifaEscalonadaSucursalDTO> ListaTarifaEscalonadaSucursal  { get; set; }
        public List<TarifaEscalonadaVigenciaDTO> ListaTarifaEscalonadaVigencia { get; set; }
        public List<TarifaEscalonadaLigadaDTO> ListaTarifaEscalonadaLigada { get; set; }
        public RequestActualizarTarifaEscalonada()
        {
            ListaTarifaEscalonadaPeriodo = new List<TarifaEscalonadaPeriodoDTO>();
            ListaTarifaEscalonadaSucursal = new List<TarifaEscalonadaSucursalDTO>();
            ListaTarifaEscalonadaVigencia = new List<TarifaEscalonadaVigenciaDTO>();
            ListaTarifaEscalonadaLigada = new List<TarifaEscalonadaLigadaDTO>();
        }
    }
}