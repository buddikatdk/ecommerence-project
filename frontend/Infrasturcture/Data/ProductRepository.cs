using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrasturcture.Data
{
    public class ProductRepository : IProductRepository
    {
        public readonly StoreContext _context;
        public ProductRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<Brand>> GetBrandsAsync()
        {
            return await _context.Brands.ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products.Include(p=>p.Brand).Include(p=>p.SubCategory).FirstOrDefaultAsync(p=>p.Id == id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        { 
            return await _context.Products.Include(p=>p.Brand).Include(p=>p.SubCategory).ToListAsync();
        }

        public async Task<IReadOnlyList<SubCategory>> GetSubCategoriesAsync()
        {
            return await _context.SubCategories.ToListAsync();
        }
    }
}