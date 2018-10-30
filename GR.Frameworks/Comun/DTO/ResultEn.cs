using System;
using System.Collections.Generic;

namespace GR.Frameworks.Comun.DTO
{
    public class ResultEn
    {
        public ResultEn()
        {
            this.Success = false;
            this.ErrCode = "";
            this.Message = "";
            this.Messages = new List<ResultEn>();
            this.IdError = new Guid();
        }
        public bool Success { get; set; }
        public string ErrCode { get; set; }
        public string Message { get; set; }
        public Guid IdError { get; set; }
        public List<ResultEn> Messages { get; set; }
    }
}
