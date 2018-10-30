using System.Collections.Generic;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ListaBusquedaClienteViewModel
    {
        public List<ListaRolClienteViewModel> Rol { get; set; }
        public string CodigoCliente { get; set; }
        public string Nombre { get; set; }
        public string Ruc { get; set; }
        public string Dni { get; set; }
        public string CodigoRol { get; set; }
    }
}