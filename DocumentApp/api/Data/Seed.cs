using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using api.Entities;
using System;
using System.IO;

namespace api.Data
{
   public class Seed
   {
      private static string _seedPath = "Data/seed.json";
      public static async Task SeedData(DataContext context)
      {
         if (await context.Categories.AnyAsync()) return;
         
         if (File.Exists(_seedPath))
         {
            var data = await System.IO.File.ReadAllTextAsync(_seedPath);
            var entities = JsonSerializer.Deserialize<List<CategoryDb>>(data);
            foreach (var entity in entities)
            {
                context.Categories.Add(entity);
            }

            await context.SaveChangesAsync();
         }
      }
   }
}