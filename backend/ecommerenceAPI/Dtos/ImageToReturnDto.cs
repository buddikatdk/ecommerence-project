using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerenceAPI.Dtos
{
    public class ImageToReturnDto
    {
        public int Id { get; set; }
        public string ImagesPath { get; set; }
        public string Product { get; set; }
        public int ProductId { get; set; }
    }
}