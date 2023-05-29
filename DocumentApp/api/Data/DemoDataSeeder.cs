using DocumentApp.Entities;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Reflection;
using System.Text.Json;
using System.Threading.Tasks;

namespace DocumentApp.Data
{
   public static class DemoDataSeeder
   {
      private const string CategoriesDemoDataFilePath = "./Data/Seed/categories.json";
      private const string DocumentsDemoDataFilePath = "./Data/Seed/documents.json";

      public static async Task SeedAsync(DataContext context)
      {
         await SeedCategoriesAsync(context);
         await SeedDocumentsAsync(context);
      }

      private static async Task SeedCategoriesAsync(DataContext context)
      {
         var categoriesFullPath = GetFullFilePath(CategoriesDemoDataFilePath);
         if (!File.Exists(categoriesFullPath) || await context.Categories.AnyAsync())
            return;

         var categoriesJson = await File.ReadAllTextAsync(categoriesFullPath);
         var categories = JsonSerializer.Deserialize<CategoryDb[]>(categoriesJson);

         if (categories is not {Length: > 0})
            return;

         await context.Categories.AddRangeAsync(categories);
         await context.SaveChangesAsync();
      }

      private static async Task SeedDocumentsAsync(DataContext context)
      {
         var documentsFullPath = GetFullFilePath(DocumentsDemoDataFilePath);
         if (!File.Exists(documentsFullPath) || await context.Docs.AnyAsync())
            return;

         var documentsJson = await File.ReadAllTextAsync(documentsFullPath);
         var documents = JsonSerializer.Deserialize<DocDb[]>(documentsJson);

         if (documents is not {Length: > 0})
            return;

         await context.Docs.AddRangeAsync(documents);
         await context.SaveChangesAsync();
      }

      private static string GetFullFilePath(string filePath)
         => $"{Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)}\\{filePath}";
   }
}