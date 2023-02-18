using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using api.DTOs;
using api.Interfaces;
using api.Entities;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;

namespace api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CategoriesController:ControllerBase
    {
        private readonly ILogger<CategoriesController> _logger;
        public ICategoriesRepository _categoriesRepository { get; }
        public IMapper _mapper { get; }

        public CategoriesController(ICategoriesRepository categoryRepository,ILogger<CategoriesController> logger,
         IMapper mapper)
        {
            _mapper = mapper;
            _categoriesRepository = categoryRepository;
            _logger = logger;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(int id)
        {
            var category = await _categoriesRepository.GetCategoryAsync(id);
            return Ok(_mapper.Map<CategoryDto>(category));
        }

        [HttpGet]
        public async Task<ActionResult<CategoryDto>> GetCategories()
        {
            var categories = await _categoriesRepository.GetCategoriesAsync();
            _logger.LogInformation("Get all categories.");
            return Ok(categories);
        }

        [HttpPost]
        public async Task<ActionResult> CreateCategory(CategoryNewUpdateDto newCategory)
        {
            //TODO check if category exists already
            var categoryToDb = new CategoryDb {Name = newCategory.Name};        
            _categoriesRepository.Create(categoryToDb);
            await _categoriesRepository.SaveAllAsync();

            var category = _categoriesRepository.GetCategoryByNameAsync(newCategory.Name).Result;

            for(int i = 0; i < 3; i++)
            {
                if(!string.IsNullOrEmpty(newCategory.Subcategories[i]))
                {
                    categoryToDb.Subcategories[i] = new SubcategoryDb {Name = newCategory.Subcategories[i]};
                }
            }         

            if (await _categoriesRepository.SaveAllAsync()) return Ok();
            return BadRequest("Failed to create category");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCategory(int id, CategoryNewUpdateDto categoryUpdateDto)
        {
            var categoryDb = await _categoriesRepository.GetCategoryAsync(id);
            categoryDb.Name = categoryUpdateDto.Name;
            int index = 0;
            for(int i = 0; i < 3; i++)
            {
                if(!string.IsNullOrWhiteSpace(categoryUpdateDto.Subcategories[index]))
                {
                    if(categoryDb.Subcategories[i] != null)
                    {
                        if(categoryDb.Subcategories[i].Name != categoryUpdateDto.Subcategories[index])
                        {
                            categoryDb.Subcategories[i].Name = categoryUpdateDto.Subcategories[index];
                        }
                    }
                    else
                    {
                        categoryDb.Subcategories[i] = new SubcategoryDb{ Name = categoryUpdateDto.Subcategories[index]};
                    }
                }
                index++;
            }
            // foreach(SubcategoryDb subcategory in categoryDb.Subcategories)
            // {
            //     if(!string.IsNullOrWhiteSpace(categoryUpdateDto.Subcategories[index]))
            //     {
            //         if(subcategory.Name != categoryUpdateDto.Subcategories[index])
            //         {
            //             subcategory.Name = categoryUpdateDto.Subcategories[index];
            //         }
            //     }
            //     index++;

            // }           
            _categoriesRepository.Update(categoryDb);
            
            if (await _categoriesRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to update document");
        }
                
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
       {  
            _categoriesRepository.Delete(id);

            if (await _categoriesRepository.SaveAllAsync()) return Ok();
            return BadRequest("Failed to delete document");
        }  
    }
    
}