using System.Threading.Tasks;
using DocumentApp.Entities;
using DocumentApp.Interfaces.RepositoriesInterfaces;
using Microsoft.EntityFrameworkCore;

namespace DocumentApp.Data.Repositories
{
   public class CategoriesRepository : ICategoriesRepository
   {

      private readonly DataContext _context;

      public CategoriesRepository(DataContext context)
      {
      _context = context;
      }

      public async Task<CategoryDb> GetCategoryAsync(int id)
      {
            return await _context.Categories
            .Include(c => c.Children)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id);

      }

      public async Task<CategoryDb[]> GetCategoriesAsync()
      {
            return await _context.Categories.AsNoTracking()
            .ToArrayAsync();
      }

      public async Task<bool> Create(CategoryDb newCategory)
      {
            _context.Categories
            .Add(newCategory).State = EntityState.Added;
            return await _context.SaveChangesAsync() > 0;
      }

      public async Task<bool> Update(CategoryDb category)
      {
            _context.Entry(category).State = EntityState.Modified;
            return await _context.SaveChangesAsync() > 0;
      }

      public async Task<bool> Delete(CategoryDb category)
      {
            _context.Entry(category).State = EntityState.Deleted; 
            return await _context.SaveChangesAsync() > 0;
      }   

      async Task<bool> ICategoriesRepository.IsCategoryExists(int categoryId)
      {
          return await _context.Categories.AnyAsync(c => c.Id == categoryId);
      }
   }
}