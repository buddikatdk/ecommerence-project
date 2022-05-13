using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Entities;
using ecommerenceAPI.Dtos;

namespace ecommerenceAPI.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product,ProductToReturnDto>().ForMember(d=>d.Brand,o=>o.MapFrom(s=>s.Brand.BrandName)).ForMember(d=>d.SubCategory,o=>o.MapFrom(s=>s.SubCategory.SubCategoryName));
            CreateMap<SubCategory,SubCategoryToReturnDto>().ForMember(d=>d.Category,o=>o.MapFrom(s=>s.Category.CategoryName));
            CreateMap<Images,ImageToReturnDto>().ForMember(d=>d.Product,o=>o.MapFrom(s=>s.Product.ProductName));
        }
    }
}