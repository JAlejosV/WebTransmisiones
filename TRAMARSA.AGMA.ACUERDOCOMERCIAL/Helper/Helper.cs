using GR.Comun.DTO;
using GR.Msc.Memberships.Agente.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GR.Msc.Memberships.Models;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helper;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Helpers
{
    public class Helper
    {
        public static ResponseUsuarioAgmaDTO GetUsuario()
        {
            if (System.Web.HttpContext.Current.Session["usuario"] != null)
            {
                return (ResponseUsuarioAgmaDTO)System.Web.HttpContext.Current.Session["usuario"];
            }
            else
            {
                //throw new Exception("No hay un usuario Loggeado");
                return null;
            }
        }
        public static ResponseUsuarioAgmaDTO GetUsuarioCliente()
        {
            if (System.Web.HttpContext.Current.Session["usuarioCliente"] != null)
            {
                return (ResponseUsuarioAgmaDTO)System.Web.HttpContext.Current.Session["usuarioCliente"];
            }
            else
            {
                //throw new Exception("No hay un usuario Loggeado");
                return null;
            }
        }
        public static String GetSociedadPropietaria()
        {
            return Convert.ToString(System.Configuration.ConfigurationManager.AppSettings["SociedadPropietariaNotificaciones"]);
        }
        public static Dictionary<string, object> GetErrorsFromModelState(ref String Errores, ModelStateDictionary ModelState)
        {
            var errors = new Dictionary<string, object>();
            foreach (var key in ModelState.Keys)
            {
                if (ModelState[key].Errors.Count > 0)
                {
                    var unerror = string.Empty;
                    foreach (ModelError item in ModelState[key].Errors)
                    {
                        unerror += item.ErrorMessage + "\n";
                    }

                    Errores += unerror;
                    errors[key] = unerror;
                }
            }

            return errors;
        }
    }
}