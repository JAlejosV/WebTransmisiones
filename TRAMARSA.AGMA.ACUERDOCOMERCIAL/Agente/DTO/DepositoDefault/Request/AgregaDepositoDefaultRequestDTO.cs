﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.DepositoDefault.Request
{
    public class AgregaDepositoDefaultRequestDTO
    {
     
        public string CodigoTipoContenedor { get; set; }
     
        public string CodigoDeposito { get; set; }
        public string CodigoSucursal { get; set; }
        public string CodigoLinea { get; set; }
        public string Observacion { get; set; }
     
        public string UsuarioCreacion { get; set; }
    }
}