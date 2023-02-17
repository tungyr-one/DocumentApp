using System;
using System.Collections.Generic;
using System.Linq;
using api.Entities;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using api.Interfaces;
using api.DTOs;
using AutoMapper;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocsController:ControllerBase
    {
        private readonly ILogger<DocsController> _logger;
        private readonly IMapper _mapper;         
        public IDocsRepository _docsRepository { get; }
        private readonly ICategoriesRepository _categoriesRepository;
        private readonly ISubcategoriesRepository _subcategoriesRepository;

        public DocsController(IDocsRepository docsRepository,
            ICategoriesRepository categoriesRepository,
            ISubcategoriesRepository subcategoriesRepository,
            ILogger<DocsController> logger,
            IMapper mapper)
        {
            _categoriesRepository = categoriesRepository;
            _subcategoriesRepository = subcategoriesRepository;
            _docsRepository = docsRepository;            
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<DocDto>> GetDocs()
        {
            var docs = await _docsRepository.GetDocsAsync();
            return Ok(_mapper.Map<IEnumerable<DocDto>>(docs));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DocDto>> GetDoc(int id)
        {
            var doc = await _docsRepository.GetDocAsync(id);
            return Ok(_mapper.Map<DocDto>(doc));
        }

        [HttpPost]
        public async Task<ActionResult> CreateDoc(DocNewDto newDoc)
        {
            var docToDb = _mapper.Map<DocDb>(newDoc);
            var category = _categoriesRepository.GetCategoryByNameAsync(newDoc.CategoryName).Result;
            var subcategory = _subcategoriesRepository.GetSubcategoryByNameAsync(newDoc.SubcategoryName).Result;
            docToDb.Category = category;
            docToDb.Subcategory = subcategory;

            _docsRepository.Create(docToDb);

            if (await _docsRepository.SaveAllAsync()) return Ok();
            return BadRequest("Failed to create document");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateDoc(int id, DocUpdateDto DocUpdateDto)
        {
            var docDb = await _docsRepository.GetDocAsync(id);
            _mapper.Map(DocUpdateDto, docDb);
            var category = _categoriesRepository.GetCategoryByNameAsync(DocUpdateDto.CategoryName).Result;
            docDb.Category = category;
            if(string.IsNullOrEmpty(DocUpdateDto.SubcategoryName))
            {
                docDb.Subcategory = null;
                docDb.SubcategoryId = null;
            }
            else
            {
                var subcategory = category.Subcategories.FirstOrDefault(s => s.Name == DocUpdateDto.SubcategoryName);
                docDb.Subcategory = subcategory;
            }
            
            _docsRepository.Update(docDb);
            
            if (await _docsRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to update document");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDoc(int id)
       {  
            _docsRepository.Delete(id);

            if (await _docsRepository.SaveAllAsync()) return Ok();
            return BadRequest("Failed to delete document");
        }        
    }
}