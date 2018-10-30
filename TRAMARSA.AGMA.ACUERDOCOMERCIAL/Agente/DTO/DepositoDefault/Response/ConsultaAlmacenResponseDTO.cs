using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.DepositoDefault.Response
{
    public class ConsultaAlmacenResponseDTO
    {
        public List<ListaAlmacenDTO> AlmacenList { get; set; }
        public Result Result { get; set; }

        public ConsultaAlmacenResponseDTO()
        {
            AlmacenList = new List<ListaAlmacenDTO>();
            this.Result = new Result();
        }
    }
}