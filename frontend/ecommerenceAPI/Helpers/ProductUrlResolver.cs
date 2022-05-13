using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Entities;
using ecommerenceAPI.Dtos;
using Microsoft.Extensions.Configuration;

namespace ecommerenceAPI.Helpers
{
    public class ProductUrlResolver : IValueResolver<Images, ImageToReturnDto, string>
    {
        public IConfiguration _config;
        public ProductUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Images source, ImageToReturnDto destination, string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.ImagesPath))
            {
                return _config["ApiUrl"] + source.ImagesPath;//full path to image
            }
            
            return null;
        }
    }
}