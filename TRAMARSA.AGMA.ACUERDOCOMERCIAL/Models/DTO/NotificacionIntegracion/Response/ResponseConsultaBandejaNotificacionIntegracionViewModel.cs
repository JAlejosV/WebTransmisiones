using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.NotificacionIntegracion;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.NotificacionIntegracion.Response
{
    public class ResponseConsultaBandejaNotificacionIntegracionViewModel
    {
        public List<ListaBandejaNotificacionIntegracionViewModel> ListaNotificacionIntegracion { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }

        public ResponseConsultaBandejaNotificacionIntegracionViewModel()
        {
            ListaNotificacionIntegracion = new List<ListaBandejaNotificacionIntegracionViewModel>();
            this.Result = new Result();
        }

    }
}