using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ListaBusquedaTarifaLocalViewModel
    {
        public List<ListaSucursalViewModel> Sucursal { get; set; }
        public List<ListaTerminalPortuarioViewModel> TerminalPorturario { get; set; }
        public List<ListaLineaViewModel> Linea { get; set; }
        public string FechaVigencia { get; set; } 
    }
}