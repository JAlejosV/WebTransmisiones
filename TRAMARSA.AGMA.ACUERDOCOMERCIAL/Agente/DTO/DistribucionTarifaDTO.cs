using System.Configuration;
using log4net.Util;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class DistribucionTarifaDTO
    {
        public string Concepto { get; set; }
        public string CodigoDistribucionTarifa { get; set; }
        public string CodTarifa { get; set; }
        public string NumeroDetalle { get; set; }
        public string TipoTarifa { get; set; }
        public decimal MontoBase { get; set; }
        public string Cuenta { get; set; }
        public decimal Porcentaje { get; set; }
        public decimal MontoBruto { get; set; }
        public decimal MontoIGV { get; set; }
        public decimal MontoNeto { get; set; }
        public string TipoCta { get; set; }
        public string DescripcionTipoCta { get; set; }
        public string Configuracion
        {
            get
            {
                return ConfigurationManager.AppSettings["valorConfiguracionDistribucionTarifa"].ToString();
            }
            set
            {
                Configuracion = ConfigurationManager.AppSettings["valorConfiguracionDistribucionTarifa"].ToString();
            }
        }
    }
}