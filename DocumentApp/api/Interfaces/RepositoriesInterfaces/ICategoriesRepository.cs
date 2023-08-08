using System.Threading.Tasks;
using DocumentApp.Entities;

namespace DocumentApp.Interfaces.RepositoriesInterfaces
{
   public interface ICategoriesRepository
   {
      ///<summary>
      /// Gets category
      ///</summary>
      Task<CategoryDb> GetCategoryAsync(int id);

      ///<summary>
      /// Gets categories list
      ///</summary>
      Task<CategoryDb[]> GetCategoriesAsync();

      ///<summary>
      /// Creates category
      ///</summary>
      Task<bool> CreateAsync(CategoryDb cateogory);

      ///<summary>
      /// Updates category
      ///</summary>
      Task<bool> UpdateAsync(CategoryDb cateogory);

      ///<summary>
      /// Deletes category
      ///</summary>
      Task<bool> DeleteAsync(CategoryDb category);

      ///<summary>
      /// Checks is category exists
      ///</summary>
      Task<bool> IsCategoryExistsAsync(int id);
   }
}