using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GR.Frameworks.Comun.DTO
{
    public class ReclamoAdjuntoDTO
    {
        public int CodigoDocumentoAdjunto;
        public int CodigoReclamo;
        public string NombreArchivo;
        public string Extension;
        public string NombreArchivoInterno;
        public string CodigoTipo;
        public string UsuarioCreacion;
        public DateTime FechaHoraCreacion;
        public string UsuarioActualizacion;
        public DateTime FechaHoraActualizacion;
        public bool EstadoRegistro;

    }
}
