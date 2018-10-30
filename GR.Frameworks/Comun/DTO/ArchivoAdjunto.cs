using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GR.Frameworks.DTO
{
    public class ArchivoAdjunto
    {
        public String RutaArchivoWeb { get; set; }
        public String RutaArchivoDisco { get; set; }
        public String NombreArchivo { get; set; }
        public Byte[] ArchivoBinario { get; set; }
        public String Imagen64bits { get; set; }

        public string GetRutaArchivoWebFront()
        {
            return this.RutaArchivoWeb.Replace("imagedownload.aspx", "ficheiros");
        }
    }
}
