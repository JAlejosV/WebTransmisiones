using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.DepositoDefault.Response
{
    public class ResponseRegistrarDepositoDefaultIndexViewModel
    {
        public List<ListaDepositoViewModel> Deposito { get; set; }
        public List<ListaLineaViewModel> Lineas { get; set; }
        public List<ListaSucursalViewModel> Sucursal { get; set; }

        
    }
}