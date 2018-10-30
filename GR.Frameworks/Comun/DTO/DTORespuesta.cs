using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GR.Comun.Entidades.Operacionales
{
    /// <summary>
    /// clase para DTORespuesta
    /// </summary>
    public class DTORespuesta
    {
        /// <summary>
        /// Codigo Error
        /// Tipo: string 
        /// Longitud: 255
        /// </summary>
        public string CodigoError { get; set; }
        /// <summary>
        /// Codigo Error SQL
        /// Tipo: string 
        /// Longitud: 255
        /// </summary>
        public string CodigoErrorSQL { get; set; }
        /// <summary>
        /// Descripcion Error
        /// Tipo: string 
        /// Longitud: 70
        /// </summary>
        public string DescripcionError { get; set; }

    }
}
