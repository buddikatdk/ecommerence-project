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
        public ProductsWithTypesAndBrandsAndCategoriesSpecification()
        {
            AddInculde(x=>x.Brand);
            AddInculde(x=>x.SubCategory);
        }

        public ProductsWithTypesAndBrandsAndCategoriesSpecification(int id) : base(x=>x.Id == id)
        {
            AddInculde(x=>x.Brand);
            AddInculde(x=>x.SubCategory); 
        }
    }
}