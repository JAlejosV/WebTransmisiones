using GR.Scriptor.Comun.DTO;
using GR.Scriptor.Membership.Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GR.Scriptor.Msc.Memberships.Agente.DTO
{
    #region Cambio y solicitud de Contraseñas

    public class ResponseCambioClave
    {
        public ResponseCambioClave()
        {
            this.Result = new Result();
        }

        public Result Result { get; set; }
        public string Correo {get; set;}
        public string Nombres { get; set; }
        public string CodigoUsuario { get; set; }
    }

    public enum TipoCambioClave
    {
        Sys = 0,
        Ui = 1
    }

    public class RequestCambioClave
    {
        public TipoCambioClave TipoCambioClave { get; set; }
        public string CodigoUsuario { get; set; }
        public string ClaveAntigua { get; set; }
        public string ClaveNueva { get; set; }
        public string ClaveNuevaConfirmada { get; set; }
        public string Dominio { get; set; }
        public string Acronimo { get; set; }
    }

    #endregion

    #region Registro de Usuarios web

    public class RequestSolicitudRegistro
    {
        public DatosSolicitante DatosSolicitante { get; set; }
    }

    #endregion

    #region Enviar Comentario

    //public class RequestEnviarComentario
    //{
    //    public string RUC { get; set; }
    //    public string RazonSocial { get; set; }
    //    public string NombreContacto { get; set; }
    //    public string Telefono { get; set; }
    //    public string Comentario { get; set; }

    //}

    #endregion

    /// <summary>
    /// clase para Request Login
    /// </summary>
    public class RequestLogin
    {
        /// <summary>
        /// Acronimo Aplicacion
        /// Tipo: string 
        /// Longitud: 20
        /// </summary>
        public string AcronimoAplicacion { get; set; }
        /// <summary>
        /// Clave
        /// Tipo: string 
        /// Longitud: 255
        /// </summary>
        public string Clave { get; set; }
        /// <summary>
        /// Codigo Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string CodigoUsuario { get; set; }
        /// <summary>
        /// Dominio
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string Dominio { get; set; }
    }

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
        /// Negocios
        /// Tipo: List<ResponseNegocioSAP> 
        /// </summary>
        public List<ResponseNegocioSAP> Negocios { get; set; }
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
        public List<ResponseOpcionUI> OpcionesUI { get; set; }
        /// <summary>
        /// Recursos Adicionales
        /// Tipo: List<ResponseRecursoAdicional> 
        /// </summary>
        public List<ResponseRecursoAdicional> RecursosAdicionales { get; set; }
        /// <summary>
        /// Roles
        /// Tipo: List<ResponseRoles> 
        /// </summary>
        public List<ResponseRoles> Roles { get; set; }
        /// <summary>
        /// Sedes
        /// Tipo: List<ResponseSedeSeguridad> 
        /// </summary>
        public List<ResponseSedeSeguridad> Sedes { get; set; }
        /// <summary>
        /// Sociedades
        /// Tipo: List<ResponseSociedadSeguridad> 
        /// </summary>
        public List<ResponseSociedadSeguridad> Sociedades { get; set; }
        /// <summary>
        /// Lista los permisos a nivel de boton, ésta porpiedad no se llena por defecto desde el servicio de seguridad
        /// </summary>
        public List<string> TablaHash { get; set; }

        public string RUC { get; set; }

        public string RazonSocial { get; set; }

    }

    public class ResponseNegocioSAP
    {
        /// <summary>
        /// Codigo
        /// Tipo: string 
        /// Longitud: 10
        /// </summary>
        public string Codigo { get; set; }

        /// <summary>
        /// Descripcion
        /// Tipo: string 
        /// Longitud: 250
        /// </summary>
        public string Descripcion { get; set; }
    }


    /// <summary>
    /// clase para Response Opcion UI
    /// </summary>
    public class ResponseOpcionUI
    {
        /// <summary>
        /// Clase
        /// Tipo: string 
        /// Longitud: 20
        /// </summary>
        public string Clase { get; set; }
        /// <summary>
        /// Codigo
        /// Tipo: string 
        /// Longitud: 10
        /// </summary>
        public string Codigo { get; set; }
        /// <summary>
        /// Conceder
        /// Tipo: bool 
        /// </summary>
        public bool Conceder { get; set; }
        /// <summary>
        /// Control Padre
        /// Tipo: string 
        /// Longitud: 20
        /// </summary>
        public string ControlPadre { get; set; }

        /// <summary>
        /// Id Opcion
        /// Tipo: string
        /// Longitud: 10
        /// </summary>

        public string IdOpcion { get; set; }
        /// <summary>
        /// Nombre Control
        /// Tipo: string 
        /// Longitud: 3
        /// </summary>
        public string NombreControl { get; set; }
        /// <summary>
        /// Opciones
        /// Tipo: List<ResponseOpcionUI> 
        /// </summary>
        public List<ResponseOpcionUI> Opciones { get; set; }
        /// <summary>
        /// Tipo
        /// Tipo: string 
        /// Longitud: 20
        /// </summary>
        public string Tipo { get; set; }
        /// <summary>
        /// Url
        /// Tipo: string 
        /// Longitud: 255
        /// </summary>
        public string Url { get; set; }
    }

    /// <summary>
    /// clase para Response Recurso Adicional
    /// </summary>
    public class ResponseRecursoAdicional
    {
        /// <summary>
        /// Codigo
        /// Tipo: string 
        /// Longitud: 10
        /// </summary>
        public string Codigo { get; set; }
        /// <summary>
        /// Descripcion
        /// Tipo: string 
        /// Longitud: 250
        /// </summary>
        public string Descripcion { get; set; }
    }


    /// <summary>
    /// clase para Response Roles
    /// </summary>
    public class ResponseRoles
    {
        /// <summary>
        /// Codigo
        /// Tipo: string 
        /// Longitud: 10
        /// </summary>
        public string Codigo { get; set; }
        /// <summary>
        /// Descripcion
        /// Tipo: string 
        /// Longitud: 250
        /// </summary>
        public string Descripcion { get; set; }
        //[IgnoreDataMember]
        public string IdRol { get; set; }
    }

    /// <summary>
    /// clase para Response Sede Seguridad
    /// </summary>
    public class ResponseSedeSeguridad
    {
        /// <summary>
        /// Codigo
        /// Tipo: string 
        /// Longitud: 10
        /// </summary>
        public string Codigo { get; set; }

        /// <summary>
        /// Descripcion
        /// Tipo: string 
        /// Longitud: 250
        /// </summary>
        public string Descripcion { get; set; }
    }


    /// <summary>
    /// clase para Response Sociedad Seguridad
    /// </summary>
    public class ResponseSociedadSeguridad
    {
        /// <summary>
        /// Codigo
        /// Tipo: string 
        /// Longitud: 10
        /// </summary>
        public string Codigo { get; set; }

        /// <summary>
        /// Descripcion
        /// Tipo: string 
        /// Longitud: 250
        /// </summary>
        public string Descripcion { get; set; }
    }

    /// <summary>
    /// clase para Response Login Usuario
    /// </summary>
    public class ResponseLoginUsuario
    {
        /// <summary>
        /// Id Perfil Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string IdPerfilUsuario { get; set; }
        /// <summary>
        /// Mensaje Error
        /// Tipo: string 
        /// Longitud: 60
        /// </summary>
        public string MensajeError { get; set; }
        /// <summary>
        /// Resultado Login
        /// Tipo: bool 
        /// </summary>
        public bool ResultadoLogin { get; set; }
    }
    /// <summary>
    /// clase para Request Info Usuario
    /// </summary>
    public class RequestInfoUsuario
    {
        /// <summary>
        /// Id Perfil Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string IdPerfilUsuario { get; set; }
    }
    /// <summary>
    /// clase para Request Consulta Permiso
    /// </summary>
    public class RequestConsultaPermiso
    {
        /// <summary>
        /// Id Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string IdUsuario { get; set; }

        /// <summary>
        /// Codigo Opcion UI
        /// Tipo: string 
        /// Longitud: 50
        /// </summary>
        public string CodigoOpcionUI { get; set; }
    }

    /// <summary>
    /// clase para Response Lista Usuarios
    /// </summary>
    public class ResponseListaUsuarios
    {
        /// <summary>
        /// Cargo
        /// Tipo: string 
        /// Longitud: 255
        /// </summary>
        public string Cargo { get; set; }
        /// <summary>
        /// Codigo Cargo
        /// Tipo: string 
        /// Longitud: 10
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
        /// DNI
        /// Tipo: string 
        /// Longitud: 11
        /// </summary>
        public string DNI { get; set; }
        /// <summary>
        /// Id Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string IdUsuario { get; set; }
        /// <summary>
        /// Nombres Completos
        /// Tipo: string 
        /// Longitud: 120
        /// </summary>
        public string NombresCompletos { get; set; }
    }
    /// <summary>
    /// clase para Request Listar Usuario
    /// </summary>
    public class RequestListarUsuario
    {
        /// <summary>
        /// Acronimo
        /// Tipo: string 
        /// Longitud: 20
        /// </summary>
        public string Acronimo { get; set; }
        /// <summary>
        /// Codigo Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string CodigoUsuario { get; set; }
        /// <summary>
        /// DNI
        /// Tipo: string 
        /// Longitud: 11
        /// </summary>
        public string DNI { get; set; }
        /// <summary>
        /// Dominio
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string Dominio { get; set; }
        /// <summary>
        /// Nombres
        /// Tipo: string 
        /// Longitud: 120
        /// </summary>
        public string Nombres { get; set; }
        /// <summary>
        /// Sociedad
        /// Tipo: string 
        /// Longitud: 3
        /// </summary>
        public string Sociedad { get; set; }
        /// <summary>
        /// Tipo Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string TipoUsuario { get; set; }
    }


    /// <summary>
    /// clase para Request DTOUsuario Por Cargo
    /// </summary>
    public class RequestDTOUsuarioPorCargo
    {
        /// <summary>
        /// Acronimo
        /// Tipo: string 
        /// Longitud: 20
        /// </summary>
        public string Acronimo { get; set; }
        /// <summary>
        /// Codigo Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string CodigoUsuario { get; set; }
        /// <summary>
        /// Codigos Cargo
        /// Tipo: List<string> 
        /// </summary>
        public List<string> CodigosCargo { get; set; }
        /// <summary>
        /// DNI
        /// Tipo: string 
        /// Longitud: 11
        /// </summary>
        public string DNI { get; set; }
        /// <summary>
        /// Dominio
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string Dominio { get; set; }
        /// <summary>
        /// Nombre
        /// Tipo: string 
        /// Longitud: 120
        /// </summary>
        public string Nombre { get; set; }
        /// <summary>
        /// Sede
        /// Tipo: string 
        /// Longitud: 4
        /// </summary>
        public string Sede { get; set; }
        /// <summary>
        /// Sociedad
        /// Tipo: string 
        /// Longitud: 3
        /// </summary>
        public string Sociedad { get; set; }
        /// <summary>
        /// Tipo Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string TipoUsuario { get; set; }
    }
    /// <summary>
    /// clase para Response Usuario Cargo
    /// </summary>
    public class ResponseUsuarioCargo
    {
        /// <summary>
        /// Codigo Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string CodigoUsuario { get; set; }
        /// <summary>
        /// Correo Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string CorreoUsuario { get; set; }
        /// <summary>
        /// DNI
        /// Tipo: string 
        /// Longitud: 11
        /// </summary>
        public string DNI { get; set; }
        /// <summary>
        /// Id Usuario
        /// Tipo: string 
        /// Longitud: 100
        /// </summary>
        public string IdUsuario { get; set; }
        /// <summary>
        /// Nombres Completos
        /// Tipo: string 
        /// Longitud: 120
        /// </summary>
        public string NombresCompletos { get; set; }
    }
    /// <summary>
    /// clase para Request Info Basica Usuario DTO
    /// </summary>
    public class RequestInfoBasicaUsuarioDTO
    {
        /// <summary>
        /// Codigos Usuario
        /// Tipo: IList<string> 
        /// </summary>
        public IList<string> CodigosUsuario { get; set; }
    }

    public class ResponseInfoBasicaUsuarioDTO
    {
        /// <summary>
        /// Lista Info Basica Usuarios
        /// Tipo: IEnumerable<ResponseListaUsuarios> 
        /// </summary>
        public IEnumerable<ResponseListaUsuarios> ListaInfoBasicaUsuarios { get; set; }
    }
    /// <summary>
    /// clase para Request Lista Cargo
    /// </summary>
    public class RequestListaCargo
    {
        /// <summary>
        /// Cod Sociedad Propietaria
        /// Tipo: string 
        /// Longitud: 3
        /// </summary>
        public string CodSociedadPropietaria { get; set; }
    }

    /// <summary>
    /// clase para Response Cargo
    /// </summary>
    public class ResponseCargo
    {
        /// <summary>
        /// Codigo
        /// Tipo: string 
        /// Longitud: 10
        /// </summary>
        public string Codigo { get; set; }
        /// <summary>
        /// Descripcion
        /// Tipo: string 
        /// Longitud: 250
        /// </summary>
        public string Descripcion { get; set; }
    }

}
