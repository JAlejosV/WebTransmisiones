using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request
{
    public class RequestActualizarTarifaLocal
    {
        public int CodigoTarifaLocal { get; set; }
        public string CodigoRegimen { get; set; }
        public string CodigoTarifa { get; set; }
        public string CodigoMoneda { get; set; }
        public string CodigoConcepto { get; set; }
        public string Accion { get; set; }
        public string CodigoLinea { get; set; }
        public decimal Monto { get; set; }
        public string CodigoUsuarioAutorizador { get; set; }
        public string UsuarioActualizacion { get; set; }
        public bool EstadoRegistro { get; set; }
        public bool ValidarTarifaEnAC { get; set; }
        public List<TarifaLocalVigenciaDTO> ListaTarifaLocalVigencia { get; set; }
        public List<TarifaLocalSucursalDTO> ListaTarifaLocalSucursal { get; set; }
        public List<TarifaLocalTerminalDTO> ListaTarifaLocalSucursalTerminal { get; set; }
        public List<TarifaLocalLigadaDTO> ListaTarifaLocalLigada { get; set; }

    }
}