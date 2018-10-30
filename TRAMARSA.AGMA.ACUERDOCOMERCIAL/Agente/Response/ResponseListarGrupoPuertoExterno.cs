using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response
{
    public class ResponseListarGrupoPuertoExterno
    {
        public List<ListaGrupoPuertoExternoDTO> GrupoPuertoExternoList { get; set; }
        public Result Result { get; set; }
        public int TotalRegistros { get; set; }
        public int NroPagina { get; set; }
        public int CantidadPaginas { get; set; }
        public ResponseListarGrupoPuertoExterno()
        {
            GrupoPuertoExternoList = new List<ListaGrupoPuertoExternoDTO>();
            this.Result = new Result();
        }
    }
}