﻿using System.Collections.Generic;
using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ResponseConsultaHistorialACEscalonado
    {
        public List<AcuerdoComercialEscalonadoHistorialDTO> AcuerdoComercialEscalonadoHistorialList { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }
        public ResponseConsultaHistorialACEscalonado()
        {
            AcuerdoComercialEscalonadoHistorialList = new List<AcuerdoComercialEscalonadoHistorialDTO>();
            Result = new Result();
        }
    }
}