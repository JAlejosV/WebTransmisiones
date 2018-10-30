using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GR.Frameworks.DTO
{
    public class CorreoBE
    {
        public CorreoBE()
        {
            Para = new List<string>();
            ConCopiaOculta = new List<string>();
            ConCopia = new List<string>();
            ArchivosAdjuntos = new List<ArchivoAdjunto>();
        }
        public String Asunto { get; set; }
        public string CuerpoMensaje { get; set; }

        public List<String> Para { get; set; }
        public List<String> ConCopiaOculta { get; set; }
        public List<String> ConCopia { get; set; }

        public List<ArchivoAdjunto> ArchivosAdjuntos { get; set; }
    }
}
