using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerenceAPI.Dtos
{
    public class SubCategoryToReturnDto
    {
        public int Id { get; set; }
        public string SubCategoryName { get; set; }
        public string Category { get; set; }
    }
}