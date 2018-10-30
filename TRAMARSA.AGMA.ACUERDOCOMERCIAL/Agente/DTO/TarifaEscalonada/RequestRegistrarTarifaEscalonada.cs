using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{

    public class RequestRegistrarTarifaEscalonada
    {
        public string CodigoRegimen { get; set; }
        public string CodigoTarifa { get; set; }
        public string CodigoConcepto { get; set; }
        public string CodigoLinea { get; set; }
        public string CodigoUnidadCalculo { get; set; }
        public string CodigoUsuarioAutorizador { get; set; }
        public string Usuario { get; set; }
        public List<TarifaEscalonadaPeriodoDTO> ListaTarifaEscalonadaPeriodo  { get; set; }
        public List<TarifaEscalonadaSucursalDTO> ListaTarifaEscalonadaSucursal  { get; set; }
        public List<TarifaEscalonadaVigenciaDTO> ListaTarifaEscalonadaVigencia { get; set; }
        public List<TarifaEscalonadaLigadaDTO> ListaTarifaEscalonadaLigada { get; set; }
        public RequestRegistrarTarifaEscalonada()
        {
            this.ListaTarifaEscalonadaPeriodo = new List<TarifaEscalonadaPeriodoDTO>();
            this.ListaTarifaEscalonadaSucursal = new List<TarifaEscalonadaSucursalDTO>();
            this.ListaTarifaEscalonadaVigencia = new List<TarifaEscalonadaVigenciaDTO>();
            this.ListaTarifaEscalonadaLigada = new List<TarifaEscalonadaLigadaDTO>();
        }
    }
}
