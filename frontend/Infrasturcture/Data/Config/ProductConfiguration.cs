using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrasturcture.Data.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p=>p.Id).IsRequired();
            builder.Property(p=>p.ProductName).IsRequired().HasMaxLength(150);
            builder.Property(p=>p.Specification).IsRequired().HasMaxLength(200);
            builder.Property(p=>p.ProductDescription).IsRequired().HasMaxLength(500);
            builder.Property(p=>p.Price).IsRequired().HasColumnType("decimal(18,2)");
           // builder.Property(p=>p.Category).HasMaxLength(150);
           // builder.Property(p=>p.Brand).HasMaxLength(150);
           // builder.Property(p=>p.SubCategory).HasMaxLength(150);
            builder.Property(p=>p.ProductRegion).HasMaxLength(50);
            builder.HasOne(b=>b.Brand).WithMany().HasForeignKey(p=>p.BrandId);
            builder.HasOne(c=>c.Category).WithMany().HasForeignKey(p=>p.CategoryId);
           // builder.HasOne(s=>s.SubCategory).WithMany().HasForeignKey(p=>p.SubCategoryId);

        }
    }
}