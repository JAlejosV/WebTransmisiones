using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Documento
{
    public class DocumentoDetalleCargaDTO
    {
        public Int64? CodigoDocumentoDetalleCarga { get; set; }
        public Int64? CodigoDocumento { get; set; }
        public Int64? CodigoContenedor { get; set; }
        public string NumeroContenedor { get; set; }
        public string NombreTipoContenedor { get; set; }
        public string TamanioTipoContenedor { get; set; }
        public Int64? CodigoCondicionTransporte { get; set; }
        public string NombreCondicionTransporte { get; set; }
        public Int64? CodigoTipoMovimiento { get; set; }
        public string NombreTipoMovimiento { get; set; }
        public Int64? CodigoUnidadMercancia { get; set; }
        public string NombreUnidadMercancia { get; set; }
        public Int64? CodigoNaturalezaCarga { get; set; }
        public string NombreNaturalezaCarga { get; set; }
        public Int64? CodigoCondicionCarga { get; set; }
        public string NombreCondicionCarga { get; set; }
        public Int64? CodigoTemperatura { get; set; }
        public string NombreTemperatura { get; set; }
        public Int64? CodigoClaseIMO { get; set; }
        public string NombreClaseIMO { get; set; }
        public Int64? CodigoNumeroIMO { get; set; }
        public string NombreNumeroIMO { get; set; }
        public Int64? CodigoAlmacenDocumentoDetalleCarga { get; set; }
        public string NombreAlmacen { get; set; }
        public Int64? CodigoDepositoDocumentoDetalleCarga { get; set; }
        public string NombreDeposito { get; set; }
        public Int64? CodigoPrecinto { get; set; }
        public string NumeroPrecinto { get; set; }
        public int? ItemDocumentoDetalleCarga { get; set; }
        public int? CantidadBultoDocumentoDetalleCarga { get; set; }
        public Decimal? PesoBrutoDocumentoDetalleCarga { get; set; }
        public Decimal? VolumenBrutoDocumentoDetalleCarga { get; set; }
        public Decimal? TemperaturaMinimaDocumentoDetalleCarga { get; set; }
        public Decimal? TemperaturaMaximaDocumentoDetalleCarga { get; set; }
        public bool PropietarioDocumentoDetalleCarga { get; set; }
        public string ObservacionDocumentoDetalleCarga { get; set; }
        public string DescripcionDocumentoDetalleCarga { get; set; }
        public string MarcasNumerosDocumentoDetalleCarga { get; set; }
        public bool FaltoDocumentoDetalleCarga { get; set; }
        public string Accion { get; set; }
    }
}