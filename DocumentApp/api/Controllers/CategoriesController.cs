using System.Threading.Tasks;
using DocumentApp.DTOs;
using DocumentApp.Interfaces.ServicesInterfaces;
using Microsoft.AspNetCore.Mvc;

namespace DocumentApp.Controllers
{
   [ApiController]
   [Route("/api/[controller]")]
   public class CategoriesController : ControllerBase
   {
      private readonly ICategoriesService _categoriesService;

      public CategoriesController(ICategoriesService categoriesService)
      {
         _categoriesService = categoriesService;
      }

        ///<summary>
        /// Gets category from service, if null returns NotFound
        ///</summary>
      [HttpGet("{id}")]
      public async Task<ActionResult<CategoryDto>> GetCategory(int id)
      {
         return await _categoriesService.GetCategoryAsync(id) switch
         {
            null => NotFound(),
            var category => Ok(category)
         };
      }

        ///<summary>
        /// Gets categories list
        ///</summary>
      [HttpGet]
      public async Task<ActionResult<CategoryDto>> GetCategories()
      {
         var categories = await _categoriesService.GetCategoriesAsync();
         return Ok(categories);
      }

        ///<summary>
        /// Creates category 
        ///</summary>
      [HttpPost]
      public async Task<ActionResult> CreateCategory(CategoryDto newCategory)
      {
         if (await _categoriesService.CreateAsync(newCategory)) return Ok();
         return BadRequest("Failed to create category");
      }

        ///<summary>
        /// Updates category 
        ///</summary>
      [HttpPut("{id}")]
      public async Task<ActionResult> UpdateCategory(int id, CategoryDto categoryUpdate)
      {
         if (await _categoriesService.UpdateAsync(id, categoryUpdate)) return NoContent();
         return BadRequest("Failed to update category");
      }

        ///<summary>
        /// Deletes category
        ///</summary>
      [HttpDelete("{id}")]
      public async Task<ActionResult> DeleteCategory(int id)
      {         
         if (await  _categoriesService.DeleteAsync(id)) return Ok();
            return BadRequest("Failed to delete category");         
      }
   }
}