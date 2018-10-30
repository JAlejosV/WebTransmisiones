using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseRegistroTipoContenedorIndexViewModel
    {
        public List<ListaLineaViewModel> Lineas { get; set; }
        public List<ClaseContenedorDTO> ClaseContenedorList { get; set; }
    }
}