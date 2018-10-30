using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.Persona;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.Response.Persona
{
    public class ResponseListarRol
    {
        public List<ListaRolDTO> ListaRoles { get; set; }
        public Result Result { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public ResponseListarRol()
        {
            ListaRoles = new List<ListaRolDTO>();
            this.Result = new Result();
        }
    }
}