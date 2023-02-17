using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using api.DTOs;
using api.Interfaces;

namespace api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class SubcategoriesController:ControllerBase
    {
        private readonly ILogger<SubcategoriesController> _logger;
        public ISubcategoriesRepository _subcategoryRepository { get; }

        public SubcategoriesController(ISubcategoriesRepository subcategoryRepository,ILogger<SubcategoriesController> logger)
        {
            _subcategoryRepository = subcategoryRepository;
            _logger = logger;
        }
        
        [HttpGet]
        public async Task<ActionResult<SubcategoryDto>> GetSubcategories()
        {
            var subcategories = await _subcategoryRepository.GetSubcategoriesAsync();
            _logger.LogInformation("Get all categories.");
            Console.WriteLine(subcategories);
            return Ok(subcategories);
        }
    }
}