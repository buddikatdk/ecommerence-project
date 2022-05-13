using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
        public class CategoryWithSubCategoriesSpecification : BaseSpecifications<SubCategory>
    {
        public CategoryWithSubCategoriesSpecification()
        {
            AddInculde(x=>x.Category);
            
        }

        public CategoryWithSubCategoriesSpecification(int id) : base(x=>x.Id == id)
        {
            AddInculde(x=>x.Category);  
        }
    }
}