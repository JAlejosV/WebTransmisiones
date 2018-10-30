using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class DetalleArriboNaveDTO
    {
        public string CodigoNave { get; set; }
        public string CodigoSucursal { get; set; }
        public string NombreSucursal { get; set; }
        public DateTime FechaArribo { get; set; }

        public string NumeroViaje { get; set; }
    }
}