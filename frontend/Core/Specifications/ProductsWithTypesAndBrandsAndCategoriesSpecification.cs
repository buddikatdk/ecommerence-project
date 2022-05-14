using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsAndCategoriesSpecification : BaseSpecifications<Product>
    {
        public ProductsWithTypesAndBrandsAndCategoriesSpecification(ProductSpecParams productSpecParams) 
        : base(x=>
        (string.IsNullOrEmpty(productSpecParams.Search) || x.ProductName.ToLower().Contains(productSpecParams.Search)) && 
        (!productSpecParams.BrandId.HasValue || x.BrandId == productSpecParams.BrandId) &&
        (!productSpecParams.SubCategoryId.HasValue || x.SubCategoryId == productSpecParams.SubCategoryId) &&
        (!productSpecParams.CategoryId.HasValue || x.SubCategory.CategoryId == productSpecParams.CategoryId)
        )
        {
            AddInculde(x=>x.Brand);
            AddInculde(x=>x.SubCategory);
            AddOrderBy(x=>x.ProductName);
            ApplyPaging(productSpecParams.PageSize * (productSpecParams.PageIndex - 1), productSpecParams.PageSize);

            if(!string.IsNullOrEmpty(productSpecParams.Sort))
            {
                switch(productSpecParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p=>p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p=>p.Price);
                        break;
                    default:
                        AddOrderBy(n=>n.ProductName);
                        break;
                }
            }
        }

        public ProductsWithTypesAndBrandsAndCategoriesSpecification(int id) : base(x=>x.Id == id)
        {
            AddInculde(x=>x.Brand);
            AddInculde(x=>x.SubCategory); 
        }
    }
}