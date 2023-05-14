using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api.Data.Repositories
{
   public class CategoriesRepository : ICategoriesRepository
   {

      private readonly DataContext _context;
      private readonly IMapper _mapper;

      public CategoriesRepository(DataContext context, IMapper mapper)
      {
      _context = context;
      _mapper = mapper;
      }

      public async Task<CategoryDb> GetCategoryAsync(int id)
      {
            return await _context.Categories
            .Include(c=> c.Children)            
            .FirstOrDefaultAsync(c => c.Id == id);
      }

      public async Task<CategoryDb[]> GetCategoriesAsync()
      {
            return await _context.Categories.AsNoTracking()

            .ToArrayAsync();
      }

      public async Task<CategoryDb> GetCategoryByNameAsync(string categoryName)
      {
            return await _context.Categories
            .Where(c => c.Name == categoryName)
            .FirstOrDefaultAsync();
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