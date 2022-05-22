using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
         public class ImagesWithProductSpecification : BaseSpecifications<Images>
    {
        public ImagesWithProductSpecification()
        {
            AddInculde(x=>x.Product);
        }

        public ImagesWithProductSpecification(int id) : base(x=>x.ProductId == id)
        {
            AddInculde(x=>x.Product);
        }
    }
}