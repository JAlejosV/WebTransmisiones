using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Maestros;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Maestros.NaturalezaCarga
{
    public class ResponseBusquedaNaturalezaCarga
    {
        public List<NaturalezaCargaDTO> ListaNaturalezaCarga { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }

        public ResponseBusquedaNaturalezaCarga()
        {
            ListaNaturalezaCarga = new List<NaturalezaCargaDTO>();
            Result = new Result();
        }
    }
}