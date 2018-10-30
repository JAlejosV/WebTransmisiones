using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GR.Frameworks;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Proxy
{
    public class BaseAgenteServicio
    {
        protected Y DeserializarJSON<T, Y>(T request, string url, string soapAction = "", bool consultaSap = false, string GuidProceso = null, string GuidEvento = null)
        {
            var utilitarioRest = new UtilitarioRest();
            return utilitarioRest.DeserializarJSON<T, Y>(request, url, GuidProceso, GuidEvento, soapAction, consultaSap);
        }

       
    }
}