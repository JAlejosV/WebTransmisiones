namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{


    /// <summary>
    /// clase para Detalle Catalogo 
    /// </summary> 
    ////[Serializable]
    //[DataContract]
    public class ListaDetalleCatalagoViewModel
    {
        /// <summary>
        /// Codigo
        /// Tipo: string 
        /// Longitud: 10
        /// </summary>
        //[DataMember]
        public string Codigo { get; set; }

        /// <summary>
        /// Descripcion
        /// Tipo: string 
        /// Longitud: 250
        /// </summary>
        //[DataMember]
        public string Descripcion { get; set; }
    }
}