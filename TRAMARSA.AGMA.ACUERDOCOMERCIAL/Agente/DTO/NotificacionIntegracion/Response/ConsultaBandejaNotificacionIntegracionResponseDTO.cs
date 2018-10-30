using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.NotificacionIntegracion;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.MonitorCoparn.Response
{
    public class ConsultaBandejaNotificacionIntegracionResponseDTO
    {
        public Result Result { get; set; }
        public List<ListaBandejaNotificacionIntegracionDTO> ListaBandejaNotificacionIntegracion { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }


        public ConsultaBandejaNotificacionIntegracionResponseDTO()
        {
            this.Result = new Result();
            this.ListaBandejaNotificacionIntegracion = new List<ListaBandejaNotificacionIntegracionDTO>();
        }
    }
}