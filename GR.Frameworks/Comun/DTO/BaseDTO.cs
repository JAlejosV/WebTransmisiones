namespace GR.Comun.DTO
{
    using GR.Comun.DTO;
    using GR.Comun.Entidades.Constantes;
    using GR.Comun.Entidades.SAP;
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// clase base para DTO
    /// <br/><b>Tipo:</b> abstract 
    /// </summary>
    public abstract class BaseDTO
    {
        /// <summary>
        /// <br/><b>Nombre:</b> 'errores'
        /// <br/><b>Tipo:</b> Dictionary<string, string>
        ///</summary>
        public Dictionary<string, string> errores
        {
            get;
            set;
        }

        /// <summary>
        /// <br/><b>Nombre:</b> 'estadoOperacion'
        /// <br/><b>Tipo:</b> string
        ///</summary>
        public string estadoOperacion
        {
            get;
            set;
        }

        /// <summary>
        /// <br/><b>Nombre:</b> 'codigoEstadoOperacion'
        /// <br/><b>Tipo:</b> string
        ///</summary>
        public string codigoEstadoOperacion
        {
            get;
            set;
        }

        /// <summary>
        /// <br/><b>Nombre:</b> 'mensajes'
        /// <br/><b>Tipo:</b> Dictionary<string, string>
        ///</summary>
        public Dictionary<string, string> mensajes
        {
            get;
            set;
        }

        public void GrabarRespuestas(string mensaje, string estadoOperacion, Exception ex)
        {
            this.estadoOperacion = estadoOperacion;
            if (estadoOperacion == ConstantesSistema.EstadoOperacionServicioCorrecto)
                codigoEstadoOperacion = "S";
            else
                if (estadoOperacion == ConstantesSistema.EstadoOperacionServicioError)
                    codigoEstadoOperacion = "E";

            switch (this.estadoOperacion)
            {
                case ConstantesSistema.EstadoOperacionServicioError:
                    if (this.errores == null)
                    {
                        this.errores = new Dictionary<string, string>();
                    }
                    this.errores.Add("0", mensaje);
                    break;
                case ConstantesSistema.EstadoOperacionServicioCorrecto:
                    if (this.mensajes == null)
                    {
                        this.mensajes = new Dictionary<string, string>();
                    }
                    this.mensajes.Add("0", mensaje);
                    break;
            }
        }
    }
}