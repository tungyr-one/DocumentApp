using System.Threading.Tasks;
using DocumentApp.Exceptions;
using AutoMapper;
using DocumentApp.DTOs;
using DocumentApp.Entities;
using DocumentApp.Interfaces.RepositoriesInterfaces;
using DocumentApp.Interfaces.ServicesInterfaces;

namespace DocumentApp.Services
{
   public class CategoriesService : ICategoriesService
   {
        private readonly ICategoriesRepository _categoriesRepository;
        private readonly IMapper _mapper;
        private readonly  IDocsRepository _docsRepository;


        public CategoriesService(ICategoriesRepository categoryRepository, 
        IDocsRepository docsRepository,
        IMapper mapper)
        {
            _categoriesRepository = categoryRepository;
            _docsRepository = docsRepository;
            _mapper = mapper;
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
          return await _categoriesRepository.CreateAsync(categoryToDb);
      }

      public async Task<bool> UpdateAsync(int id, CategoryDto categoryUpdate)
      {
          var categoryDb = await _categoriesRepository.GetCategoryAsync(id);
          if (categoryDb is null)
          {
            throw new NotFoundException("Can't find category for update");
          }
          _mapper.Map(categoryUpdate, categoryDb);      
          return await _categoriesRepository.UpdateAsync(categoryDb);
      }

      public async Task<bool> DeleteAsync(int id)
      {
          var categoryToDelete = await _categoriesRepository.GetCategoryAsync(id);

          if (categoryToDelete.Children is { Count: > 0 })
          {
              throw new ValidationException("Category has subcategories, delete them first");
          }

          if (await _docsRepository.IsDocumentWithCategoryRelationExistsAsync(categoryToDelete.Id))
          {
              throw new ValidationException("Category has documents, delete them first");
          }

          return await _categoriesRepository.DeleteAsync(categoryToDelete);
      }
   }
}