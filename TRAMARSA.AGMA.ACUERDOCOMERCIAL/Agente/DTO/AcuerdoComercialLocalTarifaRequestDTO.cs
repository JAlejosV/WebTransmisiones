using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class AcuerdoComercialLocalTarifaRequestDTO
    {
        public int? CodigoAcuerdoComercialLocal { get; set; }
        public int? CodigoTarifaLocal { get; set; }
        public string CodigoTipoDescuento { get; set; }
        public decimal? ValorDescuento { get; set; }
        public string CodigoMonedaAcuerdo { get; set; }
        public decimal? MontoAcuerdo { get; set; }
        public string Accion { get; set; }

        public string DescripcionTarifa { get; set; }
        public string Moneda { get; set; }
    }
}