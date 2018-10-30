using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.DepositoDefault
{
    public class ListaDepositoViewModel
    {
        public string CodigoDeposito { get; set; }
        public string DescripcionDeposito { get; set; }
        public string DireccionAlmacen { get; set; }
        public string RucAlmacen { get; set; }
        public string CodigoSun { get; set; }
    }
}