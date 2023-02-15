using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using api.DTOs;
using api.Interfaces;
using api.Entities;
using AutoMapper;

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
        public async Task<ActionResult> CreateCategory(CategoryDto newCategory)
        {
            var categoryToDb = _mapper.Map<CategoryDb>(newCategory);            
            if(!string.IsNullOrEmpty(categoryToDb.))
            _categoryRepository.Create(categoryToDb);

            if (await _docsRepository.SaveAllAsync()) return Ok();
            return BadRequest("Failed to create document");
        }
    }
    
}