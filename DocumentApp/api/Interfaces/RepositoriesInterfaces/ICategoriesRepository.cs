using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;

namespace api.Interfaces
{
   public interface ICategoriesRepository
   {
      ///<summary>
      /// Gets category
      ///</summary>
      Task<CategoryDb> GetCategoryAsync(int id);

      ///<summary>
      /// Gets category by name
      ///</summary>
      Task<CategoryDb> GetCategoryByNameAsync(string name);

      ///<summary>
      /// Gets categories list
      ///</summary>
      Task<IEnumerable<CategoryDb>> GetCategoriesAsync();

      ///<summary>
      /// Creates category
      ///</summary>
      void Create(CategoryDb cateogory);

      ///<summary>
      /// Updates category
      ///</summary>
      void Update(CategoryDb cateogory);

      ///<summary>
      /// Deletes category
      ///</summary>
      void Delete(int id);

      ///<summary>
      /// Checks if category exists
      ///</summary>
      Task<bool> CategoryExists(string name);

      ///<summary>
      /// Saves all changes to database
      ///</summary>
      Task<bool> SaveAllAsync();

   }
}