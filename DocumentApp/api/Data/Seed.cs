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
      public static async Task SeedData(DataContext context)
      {
         if (await context.Docs.AnyAsync()) return;
         
         if (File.Exists("Data/seed.json"))
         {
            var data = await System.IO.File.ReadAllTextAsync("Data/seed.json");
            var entities = JsonSerializer.Deserialize<List<CategoryDb>>(data);
            Console.WriteLine("ENTITIES:" + entities);
            foreach (var entity in entities)
            {
                context.Categories.Add(entity);
            }

            await context.SaveChangesAsync();
         }
      }
   }
}