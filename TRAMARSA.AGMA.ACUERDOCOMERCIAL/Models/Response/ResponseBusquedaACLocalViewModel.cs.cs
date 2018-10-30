﻿using System.Collections.Generic;
using GR.Comun.DTO;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseBusquedaACLocalViewModel
    {
        public List<ListaAcuerdoComercialLocalViewModel> AcuerdoComercialLocalList { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }
        public ResponseBusquedaACLocalViewModel()
        {
            AcuerdoComercialLocalList = new List<ListaAcuerdoComercialLocalViewModel>();
            this.Result = new Result();
        }

    }
}