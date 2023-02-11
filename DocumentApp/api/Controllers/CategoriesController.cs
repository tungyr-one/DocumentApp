
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using api.Entities;
using System;
using System.Threading.Tasks;
using api.DTOs;
using api.Interfaces;

namespace api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CategoriesController:ControllerBase
    {
        private readonly ILogger<CategoriesController> _logger;
        public ICategoriesRepository _categoryRepository { get; }

        public CategoriesController(ICategoriesRepository categoryRepository,ILogger<CategoriesController> logger)
        {
            _categoryRepository = categoryRepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<CategoryDto>> GetCategories()
        {
            var cats = await _categoryRepository.GetCategoriesAsync();
            _logger.LogInformation("Get all categories.");
            Console.WriteLine(cats);
            return Ok(cats);
        }
    }
    
}