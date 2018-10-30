using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.NotificacionIntegracion;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.NotificacionIntegracion.Request
{
    public class RequestConsultaBandejaNotificacionIntegracionViewModel:RequestBaseDTO
    {
           public PaginacionDTO paginacionDTO { get; set; }
           public ConsultaNotificacionIntegracionViewModel filtro { get; set; }

           public RequestConsultaBandejaNotificacionIntegracionViewModel()
        {
            paginacionDTO = new PaginacionDTO();
            filtro = new ConsultaNotificacionIntegracionViewModel();
        }
    }
}