using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;

namespace api.Interfaces
{
    public interface ICategoriesRepository
    {
        Task<IEnumerable<CategoryDb>> GetCategoriesAsync();
        Task<CategoryDb> GetCategoryAsync(int id);
        Task<CategoryDb> GetCategoryByNameAsync(string name);
        void Create(CategoryDb cateogory);
        void Delete(int id);
        void Update(CategoryDb cateogory);
        Task<bool> SaveAllAsync();

    }
}