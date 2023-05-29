using System.Threading.Tasks;
using AutoMapper;
using DocumentApp.DTOs;
using DocumentApp.Entities;
using DocumentApp.Exceptions;
using DocumentApp.Interfaces.RepositoriesInterfaces;
using DocumentApp.Interfaces.ServicesInterfaces;
using Microsoft.Extensions.Logging;

namespace DocumentApp.Services
{
   public class CategoriesService : ICategoriesService
   {
        private readonly ILogger<CategoriesService> _logger;
        private ICategoriesRepository _categoriesRepository { get; }
        private IMapper _mapper { get; }
        readonly IDocsRepository _docsRepository;


        public CategoriesService(ICategoriesRepository categoryRepository, 
        IDocsRepository docsRepository,
        ILogger<CategoriesService> logger,
        IMapper mapper)
        {
            _categoriesRepository = categoryRepository;
            _docsRepository = docsRepository;
            _mapper = mapper;
            _logger = logger;
        }

      public async Task<CategoryDto> GetCategoryAsync(int id)
      {
        var category = await _categoriesRepository.GetCategoryAsync(id);
        return _mapper.Map<CategoryDto>(category);
      }

      public async Task<CategoryDto[]> GetCategoriesAsync()
      {
        var categories = await _categoriesRepository.GetCategoriesAsync();
        return _mapper.Map<CategoryDto[]>(categories);
      }

      public async Task<bool> CreateAsync(CategoryDto newCategory)
      {
          var categoryToDb = _mapper.Map<CategoryDb>(newCategory);    
          return await _categoriesRepository.Create(categoryToDb);
      }

      public async Task<bool> UpdateAsync(int id, CategoryDto categoryUpdate)
      {
          var categoryDb = await _categoriesRepository.GetCategoryAsync(id);
          if (categoryDb is null)
          {
            throw new ValidationException("Can't find category for update");
          }
          _mapper.Map(categoryUpdate, categoryDb);      
          return await _categoriesRepository.Update(categoryDb);
      }

      public async Task<bool> DeleteAsync(int id)
      {
          var categoryToDelete = await _categoriesRepository.GetCategoryAsync(id);

          if (categoryToDelete.Children is { Count: > 0 })
          {
              throw new ValidationException("Category has subcategories, delete them first");
          }

          if (await _docsRepository.IsDocumentWithCategoryRelationExists(categoryToDelete.Id))
          {
              throw new ValidationException("Category has documents, delete them first");
          }

          return await _categoriesRepository.Delete(categoryToDelete);
      }
   }
}