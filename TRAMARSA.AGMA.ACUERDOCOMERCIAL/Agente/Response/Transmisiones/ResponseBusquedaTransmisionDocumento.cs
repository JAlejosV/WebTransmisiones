﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Transmisiones;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Transmisiones
{
    public class ResponseBusquedaTransmisionDocumento
    {
        public List<ListaTransmisionDocumentoDTO> ListaTransmisionDocumento { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }

        public ResponseBusquedaTransmisionDocumento()
        {
            ListaTransmisionDocumento = new List<ListaTransmisionDocumentoDTO>();
            this.Result = new Result();
        }
    }
}