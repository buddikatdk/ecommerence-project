using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrasturcture.Data
{
    public class ImageRepository: IImageRepository
    {
        public StoreContext _context;
        public ImageRepository(StoreContext context)
        {
            _context = context;
        }
        public async Task<IReadOnlyList<Images>> GetImagesAsync()
        {
            return await _context.Images.ToListAsync();
        }
    }
}