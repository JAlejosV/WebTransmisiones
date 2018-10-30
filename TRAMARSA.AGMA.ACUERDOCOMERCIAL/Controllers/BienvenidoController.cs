using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Controllers
{
    public class BienvenidoController : Controller
    {
        //
        // GET: /Bienvenido/
        public ActionResult Index()
        {
            return View("bienvenido");
        }

 
	}
}