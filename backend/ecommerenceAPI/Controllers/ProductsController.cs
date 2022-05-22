using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using ecommerenceAPI.Dtos;
using ecommerenceAPI.Errors;
using ecommerenceAPI.Helpers;
using Infrasturcture.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ecommerenceAPI.Controllers
{
    public class ProductsController : BaseApiController
    {
        public IGenericRepository<Product> _productsRepository;
        public IGenericRepository<Brand> _brandRepository;
        private readonly IGenericRepository<SubCategory> _subCategoryRepository;
        public IGenericRepository<Category> _categoryRepository;
        public IGenericRepository<Images> _imagesRepository;
        public IMapper _mapper;
        public ProductsController(IGenericRepository<Product> productsRepository, IGenericRepository<Brand> brandRepository, IGenericRepository<SubCategory> subCategoryRepository, IGenericRepository<Category> categoryRepository, IGenericRepository<Images> imagesRepository, IMapper mapper)
        {
            _mapper = mapper;
            _imagesRepository = imagesRepository;
            _categoryRepository = categoryRepository;
            _subCategoryRepository = subCategoryRepository;
            _brandRepository = brandRepository;
            _productsRepository = productsRepository;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts([FromQuery]ProductSpecParams productSpecParams)
        {
            var spec = new ProductsWithTypesAndBrandsAndCategoriesSpecification(productSpecParams);
            var countSpec = new ProductWithFilterCountSpec(productSpecParams);
            var totalItems = await _productsRepository.CountAsync(countSpec);
            var products = await _productsRepository.ListAsync(spec);
            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);
            return Ok(new Pagination<ProductToReturnDto>(productSpecParams.PageIndex,productSpecParams.PageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse),StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsAndCategoriesSpecification(id);
            var product = await _productsRepository.GetEntityWithSpec(spec);
            if(product == null)
            {
                return NotFound(new ApiResponse(404));
            }
            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<Brand>>> GetBrands()
        {
            return Ok(await _brandRepository.ListAllAsync());
        }

        [HttpGet("images")]
        public async Task<ActionResult<IReadOnlyList<Images>>> GetImages()
        {
            var spec = new ImagesWithProductSpecification();
            var images = await _imagesRepository.ListAsync(spec);
            return Ok(_mapper.Map<IReadOnlyList<Images>, IReadOnlyList<ImageToReturnDto>>(images));
        }

         [HttpGet("images/{id}")]
        public async Task<ActionResult<IReadOnlyList<Images>>> GetProductImages(int id)
        {
            var spec = new ImagesWithProductSpecification(id);
            var images = await _imagesRepository.ListAsync(spec);
            return Ok(_mapper.Map<IReadOnlyList<Images>, IReadOnlyList<ImageToReturnDto>>(images));
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IReadOnlyList<Category>>> GetCategories()
        {
            return Ok(await _categoryRepository.ListAllAsync());
        }

        [HttpGet("subcategories")]
        public async Task<ActionResult<IReadOnlyList<SubCategory>>> GetSubCategories()
        {
            var spec = new CategoryWithSubCategoriesSpecification();
            var subcategories = await _subCategoryRepository.ListAsync(spec);
            return Ok(_mapper.Map<IReadOnlyList<SubCategory>, IReadOnlyList<SubCategoryToReturnDto>>(subcategories));
        }
    }
}