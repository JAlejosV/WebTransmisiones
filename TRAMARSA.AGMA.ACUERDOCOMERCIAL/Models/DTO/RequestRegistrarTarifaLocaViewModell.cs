using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class RequestRegistrarTarifaLocaViewModell
    {
        public string CodigoRegimen { get; set; }
        public string CodigoTarifa { get; set; }
        public string CodigoConcepto { get; set; }
       // public string CodigoMoneda { get; set; }
        public string CodigoLinea { get; set; }
       // public decimal Monto { get; set; }
        public string CodigoUsuarioAutorizador { get; set; }
        public string UsuarioCreacion { get; set; }
        public string EstadoRegistro { get; set; }
        public List<TarifaLocalVigenciaViewModel> ListaTarifaLocalVigencia { get; set; }
        public List<TarifaLocalSucursalViewModel> ListaTarifaLocalSucursal { get; set; }
        public List<TarifaLocalTerminalViewModel> ListaTarifaLocalSucursalTerminal { get; set; }
        //public List<TarifaLocalLigadaViewModel> ListaTarifaLocalLigada { get; set; }
    }
}