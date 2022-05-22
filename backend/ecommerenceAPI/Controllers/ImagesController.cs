using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using ecommerenceAPI.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ecommerenceAPI.Controllers
{
    [Route("[controller]")]
    public class ImagesController : BaseApiController
    {
        private readonly IGenericRepository<Images> _imagesRepository;
        private readonly IMapper _mapper;

        public ImagesController(IGenericRepository<Images> imagesRepository,IMapper mapper)
        {
            _mapper = mapper;
            _imagesRepository = imagesRepository;
        }

        [HttpGet("images/{id}")]
        public async Task<ActionResult<IReadOnlyList<Images>>> GetProductImages(int id)
        {
            var spec = new ImagesWithProductSpecification(id);
            var images = await _imagesRepository.ListAsync(spec);
            return Ok(_mapper.Map<IReadOnlyList<Images>, IReadOnlyList<ImageToReturnDto>>(images));
        }

    }
}