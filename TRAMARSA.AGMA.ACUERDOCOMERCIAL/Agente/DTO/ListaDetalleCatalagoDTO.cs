using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{


    /// <summary>
    /// clase para Detalle Catalogo 
    /// </summary>
    ////[Serializable]
    //[DataContract]
    public class ListaDetalleCatalagoDTO
    {
        /// <summary>
        /// Codigo
        /// Tipo: string 
        /// Longitud: 10
        /// </summary>
        //[DataMember]
        public string Codigo { get; set; }
        /// <summary>
        /// Codigo
        /// Tipo: string 
        /// Longitud: 10
        /// </summary>
        //[DataMember]
        public string CodigoCatalogo { get; set; }


        /// <summary>
        /// Descripcion
        /// Tipo: string 
        /// Longitud: 250
        /// </summary>
        //[DataMember]
        public string Descripcion { get; set; }

        /// <summary>
        /// Mnemonico
        /// Tipo: string 
        /// Longitud: 20
        /// </summary>
        //[DataMember]
        public string Mnemonico
        {
            get;
            set;
        }

        /// <summary>
        /// Sociedad Propietaria
        /// Tipo: string 
        /// Longitud: 3
        /// </summary>
        //[DataMember]
        public string SociedadPropietaria
        {
            get;
            set;
        }

        /// <summary>
        /// Label
        /// Tipo: string 
        /// Longitud: 50
        /// </summary>
        //[DataMember]
        public string Label
        {
            get;
            set;
        }

        /// <summary>
        /// Val1
        /// Tipo: string 
        /// Longitud: 20
        /// </summary>
        //[DataMember]
        public string Valor1
        {
            get;
            set;
        }

        /// <summary>
        /// Val2
        /// Tipo: string 
        /// Longitud: 80
        /// </summary>
        //[DataMember]
        public string Valor2
        {
            get;
            set;
        }

        /// <summary>
        /// Val3
        /// Tipo: string 
        /// Longitud: 20
        /// </summary>
        //[DataMember]
        public string Val3
        {
            get;
            set;
        }

        /// <summary>
        /// Id Catalogo
        /// Tipo: int 
        /// </summary>
        //[DataMember]
        public int IdCatalogo
        {
            get;
            set;
        }

        /// <summary>
        /// Id Detalle Catalogo
        /// Tipo: int 
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //[DataMember]
        public int IdDetalleCatalogo
        {
            get;
            set;
        }
    }
}