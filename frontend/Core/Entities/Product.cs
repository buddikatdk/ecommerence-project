using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Product : BaseEntity
    {
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public string Specification { get; set; }
        public decimal Price { get; set; }
        public int Quentity {get; set;}
        public DateTime CreatedDate {get; set;}
        public string ProductRegion {get; set;}
        public Category Category {get; set;}
        public int CategoryId {get; set;}
       // public SubCategory SubCategory {get; set;}
       // public int SubCategoryId {get; set;}
        public Brand Brand {get; set;}
        public int BrandId {get; set;}

    }
}