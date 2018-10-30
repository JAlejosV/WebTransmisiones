using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Documento;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Request.Documento
{
    public class RequestRegistrarDocumentoViewModel
    {
        public Int64? CodigoDocumento { get; set; }
        public Int64? CodigoItinerario { get; set; }
        public Int64? CodigoPuertoOrigenDocumento { get; set; }
        public string NombrePuertoOrigen { get; set; }
        public Int64? CodigoPuertoEmbarqueDocumento { get; set; }
        public string NombrePuertoEmbarque { get; set; }
        public Int64? CodigoPuertoDescargaDocumento { get; set; }
        public string NombrePuertoDescarga { get; set; }
        public Int64? CodigoPuertoFinalDocumento { get; set; }
        public string NombrePuertoFinal { get; set; }
        public Int64? CodigoLineaNaviera { get; set; }
        public string NombreLineaNaviera { get; set; }
        public Int64? CodigoAduana { get; set; }
        public string NombreAduana { get; set; }
        public Int64? CodigoTipoBL { get; set; }
        public string NombreTipoBL { get; set; }
        public Int64? CodigoTipoEnvio { get; set; }
        public string NombreTipoEnvio { get; set; }
        public Int64? CodigoCondicionContrato { get; set; }
        public string NombreCondicionContrato { get; set; }
        public Int64? CodigoRequerimientoServicio { get; set; }
        public string NombreRequerimientoServicio { get; set; }
        public string NumeroDocumento { get; set; }
        public DateTime? FechaEmisionDocumento { get; set; }
        public DateTime? FechaEmbarqueDocumento { get; set; }
        public bool EstadoRegistro { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime? FechaHoraActualizacion { get; set; }
        public string Accion { get; set; }

        public List<DocumentoDetalleCargaViewModel> ListaDocumentoDetalleCarga { get; set; }
        public List<DocumentoDetalleClienteViewModel> ListaDocumentoDetalleCliente { get; set; }
        public List<DocumentoDetalleFleteViewModel> ListaDocumentoDetalleFlete { get; set; }

        public RequestRegistrarDocumentoViewModel()
        {
            ListaDocumentoDetalleCarga = new List<DocumentoDetalleCargaViewModel>();
            ListaDocumentoDetalleCliente = new List<DocumentoDetalleClienteViewModel>();
            ListaDocumentoDetalleFlete = new List<DocumentoDetalleFleteViewModel>();
        }
    }
}