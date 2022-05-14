using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrasturcture.Data
{
    public class CategoryRepository : ICategoryRepository
    {
        public StoreContext _context;
        public CategoryRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<Category>> GetCategoriesAsync()
         {
             return await _context.Categories.ToListAsync();
         }
    }
}