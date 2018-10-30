using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.NotificacionIntegracion.Response
{
    public class ResponseConsultaDetalleNotificacionIntegracionViewModel
    {
        public List<ListaDetalleNotificacionIntegracionViewModel> DetalleNotifacionIntegracion { get; set; }
        public Result Result { get; set; }
        public ResponseConsultaDetalleNotificacionIntegracionViewModel()
        {
            Result = new Result();
            DetalleNotifacionIntegracion = new List<ListaDetalleNotificacionIntegracionViewModel>();
        }
    }
}