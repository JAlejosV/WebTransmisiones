using System.Collections.Generic;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class IngresoMasivoRAPTDTO
    {
        public string CodigoLinea { get; set; }
        public UsuarioSeguridadDTO UsuarioSeguridadDTO { get; set; }
        public ObjetoTrazabilidad ObjetoTrazabilidad { get; set; }
        public List<RAPTItemDTO> RAPTDTOList { get; set; }
        public IngresoMasivoRAPTDTO()
        {
            RAPTDTOList = new List<RAPTItemDTO>();
        }
    }
}