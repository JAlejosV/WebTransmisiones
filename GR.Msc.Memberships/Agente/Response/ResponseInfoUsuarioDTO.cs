using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GR.Msc.Memberships.Models;

namespace GR.Msc.Memberships.Agente.Response
{
    /// <summary>
    /// clase para Response Info Usuario DTO
    /// </summary>
    public class ResponseInfoUsuarioDTO
    {

        public string TipoUsuario { get; set; }
        public bool esExterno { get; set; }
        /// <summary>
        /// perfil de usuario<br/>no se obtiene desde el servicio
        /// </summary>
        public String IdPerfilUsuario { get; set; }
        /// <summary>
        /// Alias
        /// Tipo: string 
        /// Longitud: 255
        /// </summary>
        public string Alias { get; set; }
        /// <summary>
        /// Cargo
        /// Tipo: string 
        /// Longitud: 255
        /// </summary>
        public string Cargo { get; set; }
        /// <summary>
        /// Codigo Cargo
        /// Tipo: string 
        /// Longitud: 20
        /// </summary>
        public string CodigoCargo { get; set; }
        /// <summary>
        /// Codigo Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string CodigoUsuario { get; set; }
        /// <summary>
        /// Correo
        /// Tipo: string 
        /// Longitud: 120
        /// </summary>
        public string Correo { get; set; }
        /// <summary>
        /// Dominio
        /// Tipo: string 
        /// Longitud: 80
        /// </summary>
        public string Dominio { get; set; }
        /// <summary>
        /// Id Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string IdUsuario { get; set; }

        /// <summary>
        /// Nombres Completos
        /// Tipo: string 
        /// Longitud: 255
        /// </summary>
        public string NombresCompletos { get; set; }
        /// <summary>
        /// Opciones UI
        /// Tipo: List<ResponseOpcionUI> 
        /// </summary>

        /// <summary>
        /// Lista de String
        /// <br/><b>Tipo:</b> List<String> 
        /// </summary>
        //public List<String> LineasPermitidas { get; set; }

        public List<ResponseOpcionUI> OpcionesUI { get; set; }
        public List<RecursoDTO> RecursosAdicionales { get; set; }
        public List<RecursoDTO> Sedes { get; set; }
        //public List<RecursoDTO> TipoReclamo { get; set; }
        /// <summary>
        /// Roles
        /// Tipo: List<ResponseRoles> 
        /// </summary>
        public List<ResponseRoles> Roles { get; set; }

        /// <summary>
        /// Lista los permisos a nivel de boton, ésta porpiedad no se llena por defecto desde el servicio de seguridad
        /// </summary>
        public List<string> TablaHash { get; set; }

        public string RUC { get; set; }

        public string RazonSocial { get; set; }

    }
}