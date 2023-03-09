using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs;

namespace api.Interfaces.ServicesInterfaces
{
    public interface ICategoriesService
    {
        ///<summary>
        /// Gets category
        ///</summary>
        Task<CategoryDto> GetCategoryAsync(int id);

        ///<summary>
        /// Gets categories list
        ///</summary>
        Task<IEnumerable<CategoryDto>> GetCategoriesAsync();

        ///<summary>
        /// Creates category
        ///</summary>
        Task<bool> CreateAsync(CategoryUpdateDto newCategory);

        ///<summary>
        /// Updates category
        ///</summary>
        Task<bool> UpdateAsync(int id, CategoryUpdateDto CategoryUpdate);

        ///<summary>
        /// Deletes category
        ///</summary>
        Task<bool> DeleteAsync(int id);
    }
}