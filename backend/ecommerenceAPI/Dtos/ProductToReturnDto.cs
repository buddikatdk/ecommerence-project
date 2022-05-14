using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerenceAPI.Dtos
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public string Specification { get; set; }
        public decimal Price { get; set; }
        public int Quentity {get; set;}
        public DateTime CreatedDate {get; set;}
        public string ProductRegion {get; set;}
        //public string Category {get; set;}
        public string SubCategory {get; set;}
       // public int SubCategoryId {get; set;}
        public string Brand {get; set;}
    }
}