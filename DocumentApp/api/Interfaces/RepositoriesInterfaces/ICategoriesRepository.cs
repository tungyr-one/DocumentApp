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
      Task<CategoryDb[]> GetCategoriesAsync();

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
      void Delete(CategoryDb category);

      ///<summary>
      /// Checks is category exists
      ///</summary>
      Task<bool> IsCategoryExists(int id);

      ///<summary>
      /// Saves all changes to database
      ///</summary>
      Task<bool> SaveAllAsync();

   }
}