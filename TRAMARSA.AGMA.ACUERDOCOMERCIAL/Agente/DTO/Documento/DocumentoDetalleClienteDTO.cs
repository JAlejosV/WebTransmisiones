﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Documento
{
    public class DocumentoDetalleClienteDTO
    {
        public Int64? CodigoDocumentoDetalleCliente { get; set; }
        public Int64? CodigoDocumento { get; set; }
        public Int64? CodigoRol { get; set; }
        public string NombreRol { get; set; }
        public Int64? CodigoPersona { get; set; }
        public string RazonSocialPersona { get; set; }
        public string Accion { get; set; }
    }
}