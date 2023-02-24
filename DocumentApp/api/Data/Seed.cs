using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using api.Entities;
using System;

namespace api.Data
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if(await context.Docs.AnyAsync()) return;
            var categoryData = await System.IO.File.ReadAllTextAsync("Data/seed/categorySeed.json");
            var categories = JsonSerializer.Deserialize<List<CategoryDb>>(categoryData);
            
            foreach (var category in categories)
            {
                context.Categories.Add(category);
            }

            await context.SaveChangesAsync();
        }
    }
}