using GR.Comun.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Response
{
    public class ResponseConsultaDetalleNotificacionViewModel
    {
        public List<ConsultaDetalleNotificacionViewModel> DetalleBlNotificacionList { get; set; }
        public Result Result { get; set; }
        public ResponseConsultaDetalleNotificacionViewModel()
        {
            Result = new Result();
            DetalleBlNotificacionList = new List<ConsultaDetalleNotificacionViewModel>();
        }
    }
}