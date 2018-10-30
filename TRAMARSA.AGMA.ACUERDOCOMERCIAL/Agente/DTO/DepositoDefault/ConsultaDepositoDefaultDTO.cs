using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.DepositoDefault
{
    public class ConsultaDepositoDefaultDTO
    {
        public int Id { get; set; }
        public string CodigoTipoContenedor { get; set; }
        public string DescripcionTipoContenedor { get; set; }
        public string CodigoDeposito { get; set; }
        public string DescripcionDeposito { get; set; }
        public string DescripcionEstado { get; set; }
        public string Observacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }


        public string CodigoLinea { get; set; }
        public string DescripcionLinea { get; set; }
        public string CodigoSucursal { get; set; }
        public string DescripcionSucursal { get; set; }
        public string CodigoEstado { get; set; }
    }
}