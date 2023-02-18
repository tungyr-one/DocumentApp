using System;
using System.Collections.Generic;
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
            return await _context.Categories.Include(c=> c.Subcategories)            
            .FirstOrDefaultAsync(c => c.Id == id);
      }

      public async Task<IEnumerable<CategoryDb>> GetCategoriesAsync()
      {
            return await _context.Categories
            .Include(d => d.Subcategories)
            .ToListAsync();
      }

      public async Task<CategoryDb> GetCategoryByNameAsync(string catName)
      {
            //TODO remove all 'cat' names
            return await _context.Categories.Where(c => c.Name == catName).Include(c => c.Subcategories)
            .FirstOrDefaultAsync();
      }

      public void Create(CategoryDb newCategory)
      {
            _context.Categories
            .Add(newCategory).State = EntityState.Added;
      }

      public void Update(CategoryDb category)
      {            
            _context.Entry(category).State = EntityState.Modified;
      }

      public void Delete(int id)
      {
            var categoryToDelete = _context.Categories.Find(id);
            _context.Entry(categoryToDelete).State = EntityState.Deleted; 
      }   

      public async Task<bool> SaveAllAsync()
      {
            return await _context.SaveChangesAsync() > 0;
      }

   }
}