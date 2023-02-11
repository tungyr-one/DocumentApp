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
            var subcategoryData = await System.IO.File.ReadAllTextAsync("Data/seed/subcategorySeed.json");
            var docData = await System.IO.File.ReadAllTextAsync("Data/seed/docSeed.json");
            Console.WriteLine(categoryData);

            var categories = JsonSerializer.Deserialize<List<CategoryDb>>(categoryData);
            var subcategories = JsonSerializer.Deserialize<List<SubcategoryDb>>(subcategoryData);
            var docs = JsonSerializer.Deserialize<List<DocDb>>(docData);
            Console.WriteLine("categories: ", categories);
            foreach (var category in categories)
            {
                context.Categories.Add(category);
            }

            foreach (var subcategory in subcategories)
            {
                context.Subcategories.Add(subcategory);
            }

            foreach (var doc in docs)
            {
                context.Docs.Add(doc);
            }

            await context.SaveChangesAsync();
        }
    }
}