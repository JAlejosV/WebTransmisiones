namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun
{
    public class RequestBaseDTO
    {
        public RequestBaseDTO()
        {
            this.ObjetoTrazabilidad = new ObjetoTrazabilidad();
        }

        public void SetRequestBaseDTO(RequestBaseDTO requestBaseDTO)
        {
            string eventoGuid = "";
            string origenGuid = "";

            if (requestBaseDTO == null)
                return;

            //this.UsuarioSeguridadDTO = requestBaseDTO.UsuarioSeguridadDTO;

            if (requestBaseDTO.ObjetoTrazabilidad != null)
            {
                eventoGuid = !string.IsNullOrEmpty(requestBaseDTO.ObjetoTrazabilidad.GuidEvento) ? requestBaseDTO.ObjetoTrazabilidad.GuidEvento : "";
                origenGuid = !string.IsNullOrEmpty(requestBaseDTO.ObjetoTrazabilidad.GuidFormulario) ? requestBaseDTO.ObjetoTrazabilidad.GuidFormulario : "";
            }


            ObjetoTrazabilidad = new ObjetoTrazabilidad()
            {
                GuidEvento = eventoGuid,
                GuidFormulario = origenGuid,
                ValorReferencial = ""
            };
        }

        /// <summary>
        /// NombreUsuario Seguridad
        /// <br/><b>Tipo:</b> UsuarioSeguridadDTO 
        /// </summary>
        //public UsuarioSeguridadDTO UsuarioSeguridadDTO { get; set; }

        public ObjetoTrazabilidad ObjetoTrazabilidad { get; set; }
    }

    public class ObjetoTrazabilidad
    {
        public ObjetoTrazabilidad()
        {
            this.GuidFormulario = "";
            this.GuidEvento = "";
            this.ValorReferencial = "";
        }

        public string GuidFormulario { get; set; }
        public string GuidEvento { get; set; }
        public string ValorReferencial { get; set; }
    }
}