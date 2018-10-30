using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class ListaUsuarioViewModel
    {
        public string IdRecursoPerfil { get; set; }
        public string IdPerfilUsuario { get; set; }
        public string IdRecursoDetalle { get; set; }
        public bool Conceder { get; set; }
        public string RecursoPadre { get; set; }
        public string CodigoRecurso { get; set; }
        public string Descripcion { get; set; }
        public string Nivel { get; set; }
        public string Acronimo { get; set; }
        public string IdUsuario { get; set; }
        public string NombresCompletos { get; set; }
        public string NombreUsuario { get; set; }
        public string CorreoUsuario { get; set; }
        public string Dominio { get; set; }
        public string Tipo { get; set; }
    }
}