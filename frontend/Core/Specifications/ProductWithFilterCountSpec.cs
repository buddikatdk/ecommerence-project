using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFilterCountSpec :BaseSpecifications<Product>
    {
        public ProductWithFilterCountSpec(ProductSpecParams productSpecParams)
                : base(x=>
        (string.IsNullOrEmpty(productSpecParams.Search) || x.ProductName.ToLower().Contains(productSpecParams.Search)) && 
        (!productSpecParams.BrandId.HasValue || x.BrandId == productSpecParams.BrandId) &&
        (!productSpecParams.SubCategoryId.HasValue || x.SubCategoryId == productSpecParams.SubCategoryId) &&
        (!productSpecParams.CategoryId.HasValue || x.SubCategory.CategoryId == productSpecParams.CategoryId)
        )
        {
        }
    }
}