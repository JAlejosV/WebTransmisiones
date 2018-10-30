using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO.Seguridad
{
    public class UsuarioAgmaDTO:GR.Msc.Memberships.Models.UsuarioDTO
    {
        public List<string> ListaCodigosLineas { get; set; }
        public List<string> ListaCodigosPuertos { get; set; }
        public List<string> ListaCodigosSucursales { get; set; }
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
    }
}