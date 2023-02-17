using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using api.DTOs;
using api.Interfaces;
using api.Entities;
using AutoMapper;
using System.Collections.Generic;

namespace api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CategoriesController:ControllerBase
    {
        private readonly ILogger<CategoriesController> _logger;
        public ICategoriesRepository _categoryRepository { get; }
        public IMapper _mapper { get; }

        public CategoriesController(ICategoriesRepository categoryRepository,ILogger<CategoriesController> logger,
         IMapper mapper)
        {
            _mapper = mapper;
            _categoryRepository = categoryRepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<CategoryDto>> GetCategories()
        {
            var categories = await _categoryRepository.GetCategoriesAsync();
            _logger.LogInformation("Get all categories.");
            return Ok(categories);
        }

        [HttpPost]
        public async Task<ActionResult> CreateCategory(CategoryNewDto newCategory)
        {
            //TODO check if category exists already
            var subcategoriesToAdd = new List<SubcategoryDb>();
            var categoryToDb = new CategoryDb {Name = newCategory.Name};        
            _categoryRepository.Create(categoryToDb);
            await _categoryRepository.SaveAllAsync();

            var category = _categoryRepository.GetCategoryByNameAsync(newCategory.Name).Result;

            foreach(string subcategoryName in newCategory.SubcategoryNames)
            {
                if(!string.IsNullOrEmpty(subcategoryName))
                {
                    subcategoriesToAdd.Add(new SubcategoryDb {Name = subcategoryName});
                }
            }
            category.Subcategories = subcategoriesToAdd;          

            if (await _categoryRepository.SaveAllAsync()) return Ok();
            return BadRequest("Failed to create category");
        }
                
        [HttpDelete("{name}")]
        public async Task<ActionResult> DeleteCategory(string name)
       {  
            _categoryRepository.Delete(name);

            if (await _categoryRepository.SaveAllAsync()) return Ok();
            return BadRequest("Failed to delete document");
        }  
    }
    
}