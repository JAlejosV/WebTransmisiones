using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ListaBusquedaTarifaGeneralesViewModel
    {
        public List<ListaSucursalViewModel> Sucursal { get; set; }
        public List<ListaTerminalPortuarioViewModel> TerminalPortuario { get; set; }
        public List<ListaLineaViewModel> Linea { get; set; } 
        public string DescripcionTarifa { get; set; }
    }
}