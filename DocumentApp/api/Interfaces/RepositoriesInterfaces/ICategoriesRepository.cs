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
      /// Gets categories list
      ///</summary>
      Task<CategoryDb[]> GetCategoriesAsync();

      ///<summary>
      /// Creates category
      ///</summary>
      Task<bool> Create(CategoryDb cateogory);

      ///<summary>
      /// Updates category
      ///</summary>
      Task<bool> Update(CategoryDb cateogory);

      ///<summary>
      /// Deletes category
      ///</summary>
      Task<bool> Delete(CategoryDb category);

      ///<summary>
      /// Checks is category exists
      ///</summary>
      Task<bool> IsCategoryExists(int id);
   }
}