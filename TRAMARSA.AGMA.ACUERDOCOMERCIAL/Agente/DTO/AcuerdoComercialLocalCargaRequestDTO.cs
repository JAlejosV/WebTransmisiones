﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class AcuerdoComercialLocalCargaRequestDTO
    {

        public int? CodigoAcuerdoComercialLocal { get; set; }
        public string CodigoNave { get; set; }
        public string NumeroViaje { get; set; }
        public string PuertoOrigen { get; set; }
        public string PuertoEmbarque { get; set; }
        public string PuertoDestino { get; set; }
        public string DestinoFinal { get; set; }
        public string CodigoLinea { get; set; }
        public string NumeroBL { get; set; }
        public string CodigoContenedor { get; set; }
        public string TipoBL { get; set; }
        public string TipoDocumento { get; set; }
        public string NroBkn { get; set; }
        public string Accion { get; set; }

    }
}