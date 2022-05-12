using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrasturcture.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context,ILoggerFactory loggerFactory)
        {
            try{
                if(!context.Brands.Any())
                {
                    var brandsData = File.ReadAllText("../Infrasturcture/Data/SeedData/brands.json");

                    var brands = JsonSerializer.Deserialize<List<Brand>>(brandsData);

                    foreach(var item in brands)
                    {
                        context.Brands.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if(!context.Categories.Any())
                {
                    var categoriesData = File.ReadAllText("../Infrasturcture/Data/SeedData/categories.json");

                    var categories = JsonSerializer.Deserialize<List<Category>>(categoriesData);

                    foreach(var item in categories)
                    {
                        context.Categories.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

              /* if(!context.SubCategories.Any())
                {
                    var subCategoriesData = File.ReadAllText("../Infrasturcture/Data/SeedData/subcategories.json");

                    var subCategories = JsonSerializer.Deserialize<List<SubCategory>>(subCategoriesData);

                    foreach(var item in subCategories)
                    {
                        context.SubCategories.Add(item);
                    }

                    await context.SaveChangesAsync();
                }*/

                if(!context.Products.Any())
                {
                    var productsData = File.ReadAllText("../Infrasturcture/Data/SeedData/products.json");

                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);

                    foreach(var item in products)
                    {
                        context.Products.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
            }catch(Exception ex)
            {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}