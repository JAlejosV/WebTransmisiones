using System.Collections.Generic;
using GR.Comun.DTO;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Agente.DTO
{
    public class ResponseListarSucursal
    {
        public List<ListaSucursalDTO> SucursalesList { get; set; }
        public Result Result { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public ResponseListarSucursal()
        {
            SucursalesList = new List<ListaSucursalDTO>();
            this.Result = new Result();
        }
    }
}