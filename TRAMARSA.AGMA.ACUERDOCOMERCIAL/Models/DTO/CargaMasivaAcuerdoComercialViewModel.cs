using System;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.DTO
{
    public class CargaMasivaAcuerdoComercialViewModel
    {
        public string Row { get; set; }
        public string CuName { get; set; }
        public string ContractNo { get; set; }
        public string ServiceID { get; set; }
        public string LocString { get; set; }
        public string RateGroupName { get; set; }
        public string ChargeType { get; set; }
        public decimal TpR { get; set; }
        public decimal TpD { get; set; }
        public decimal TpB { get; set; }
        public string TpL { get; set; }
        public int TpT { get; set; }
        public decimal TariffTpR { get; set; }
        public decimal TariffTpD { get; set; }
        public decimal TariffTpB { get; set; }
        public string TariffTpL { get; set; }
        public decimal TariffTpT { get; set; }
        public decimal RateAmount { get; set; }
        public string Curr { get; set; }
        public DateTime? RateValidTO { get; set; }
        public string UpdUserID { get; set; }
        public string SrValid { get; set; }
        public DateTime? RateChanged { get; set; }
        public DateTime? DateOfIssue { get; set; }
        public string CuSupp { get; set; }


        // Nuevos campos
        public DateTime RateValidFROM { get; set; }
        public string Account { get; set; }
        public string Type { get; set; }
        public string CommodityGrpCode { get; set; }
        public string CommodityGrpNo { get; set; }
        public string HSChapter { get; set; }
        public string HSPosition { get; set; }
        public string HSSubPosition { get; set; }
        public string DG { get; set; }
        public string ShippersOwn { get; set; }
        //public string OperOffer { get; set; }

        public string OperReefer { get; set; }
        public string CG1HSCode { get; set; }
        public string CG1HSDesc { get; set; }
        public string CG2HSCode { get; set; }
        public string CG2HSDesc { get; set; }
        public string CG3HSCode { get; set; }
        public string CG3HSDesc { get; set; }
        public string CG4HSCode { get; set; }
        public string CG4HSDesc { get; set; }
        public string CG5HSCode { get; set; }
        public string CG5HSDesc { get; set; }
        public string HS1HSCode { get; set; }
        public string HS1HSDesc { get; set; }
        public string HS2HSCode { get; set; }
        public string HS2HSDesc { get; set; }
        public string HS3HSCode { get; set; }
        public string HS3HSDesc { get; set; }
        public string HS4HSCode { get; set; }
        public string HS4HSDesc { get; set; }
        public string HS5HSCode { get; set; }
        public string HS5HSDesc { get; set; }
        public string RateID { get; set; }
        public string Remake { get; set; }

    }
}