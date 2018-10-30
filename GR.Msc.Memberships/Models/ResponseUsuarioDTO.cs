using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GR.Msc.Memberships.Agente.Response;

namespace GR.Msc.Memberships.Models
{
    /*
    public class ResponseUsuarioDTO
    {
        public UsuarioDTO Usuario { get; set; }
        /// <summary>
        /// url no permitidas
        /// </summary>
        public List<string> Permisos { get; set; }
        public List<string> NoPermisos { get; set; }
        public List<string> Menu { get; set; }
    }
      public class UsuarioDTO
    {
        public string Nombre { get; set; }
        public string CuentaRed { get; set; }
    }
    */
    public class ResponseUsuarioMscDTO
    {
        public UsuarioDTO Usuario { get; set; }
    }

    public class UsuarioDTO
    {
        #region "Atributos Propiedades"
        /// <summary>
        /// Código de Usuario
        /// <br/><b>Tipo:</b> string 
        /// <br/><b>Longitud:</b> 100
        /// </summary>
        public string CodigoUsuario { get; set; }

        /// <summary>
        /// Nombre Persona
        /// <br/><b>Tipo:</b> String 
        /// <br/><b>Longitud:</b> 70
        /// </summary>
        public String NombrePersona { get; set; }

        /// <summary>
        /// Nombre Completo de Usuario
        /// <br/><b>Tipo:</b> String 
        /// <br/><b>Longitud:</b> 120
        /// </summary>
        public String NombreUsuario { get; set; }

        /// <summary>
        /// Código de Cargo
        /// <br/><b>Tipo:</b> string 
        /// <br/><b>Longitud:</b> 20
        /// </summary>
        public string CodigoCargo { get; set; }

        /// <summary>
        /// Cargo
        /// <br/><b>Tipo:</b> string 
        /// <br/><b>Longitud:</b> 50
        /// </summary>
        public string Cargo { get; set; }

        /// <summary>
        /// Id Usuario
        /// <br/><b>Tipo:</b> string 
        /// <br/><b>Longitud:</b> 100
        /// </summary>
        public string IdUsuario { get; set; }
        /// <summary>
        /// Cuenta Red
        /// <br/><b>Tipo:</b> string 
        /// <br/><b>Longitud:</b> 50
        /// </summary>
        public string CuentaRed { get; set; }

        /// <summary>
        /// Id Perfil Usuario
        /// <br/><b>Tipo:</b> string 
        /// <br/><b>Longitud:</b> 50
        /// </summary>
        public string IdPerfilUsuario { get; set; }

        /// <summary>
        /// Email
        /// <br/><b>Tipo:</b> string 
        /// <br/><b>Longitud:</b> 140
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Rol Descripcion
        /// <br/><b>Tipo:</b> string 
        /// <br/><b>Longitud:</b> 50
        /// </summary>
        public string RolDescripcion { get; set; } //10-10-2013

        public bool esExterno { get; set; }

        public string Alias { get; set; }

        public string TipoUsuario { get; set; }

        #endregion

        #region "Atributos Listas"
        /// <summary>
        /// Lista de string
        /// <br/><b>Tipo:</b> List<string> 
        /// </summary>
        public List<string> Permisos { get; set; }

        /// <summary>
        /// Lista de string
        /// <br/><b>LineasPermitidas:</b> List<string> 
        /// </summary>
        public List<RecursoDTO> Recursos { get; set; }

        /// <summary>
        /// Lista de string
        /// <br/><b>Tipo:</b> List<string> 
        /// </summary>
        public List<string> PermisosBotones { get; set; }

        /// <summary>
        /// Lista de string
        /// <br/><b>LineasPermitidas:</b> List<string> 
        /// </summary>
        public List<RecursoDTO> Sedes { get; set; }
        
        //public List<RecursoDTO> TipoReclamo { get; set; }


        #endregion

        public List<ResponseOpcionUI> Menu { get; set; }

        public List<ResponseRoles> Roles { get; set; }
    }



}