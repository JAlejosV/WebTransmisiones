using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO.NotificacionIntegracion.Response
{
    public class ConsultaDetalleNotificacionIntegracionResponseDTO
    {
        public List<ListaDetalleNotificacionIntegracionDTO> ListaDetalleNotificacionIntegracion { get; set; }
        public Result Result { get; set; }
        public ConsultaDetalleNotificacionIntegracionResponseDTO()
        {
            this.Result = new Result();
            this.ListaDetalleNotificacionIntegracion = new List<ListaDetalleNotificacionIntegracionDTO>();
        }
    }
}