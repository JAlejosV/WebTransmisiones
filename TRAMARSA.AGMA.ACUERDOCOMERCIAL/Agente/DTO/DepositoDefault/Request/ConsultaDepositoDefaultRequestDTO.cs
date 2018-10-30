using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Request;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.DepositoDefault.Request
{
    public class ConsultaDepositoDefaultRequestDTO : BaseRequest
    {
        //public PaginacionDTO paginacionDTO { get; set; }
        public string CodigoTipoContenedor { get; set; }
        public string CodigoDeposito { get; set; }
        public string CodigoLinea { get; set; }
        public string CodigoSucursal { get; set; }
        public string CodigoEstado { get; set; }

    }

}