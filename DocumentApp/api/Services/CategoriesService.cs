using System.Collections.Generic;
using System.Threading.Tasks;
using api.DTOs;
using api.Entities;
using api.Interfaces;
using api.Interfaces.ServicesInterfaces;
using AutoMapper;
using Microsoft.Extensions.Logging;

namespace api.Services
{
   public class CategoriesService : ICategoriesService
   {
        private readonly ILogger<CategoriesService> _logger;
        private ICategoriesRepository _categoriesRepository { get; }
        private IMapper _mapper { get; }

        public CategoriesService(ICategoriesRepository categoryRepository,ILogger<CategoriesService> logger,
         IMapper mapper)
        {
            _mapper = mapper;
            _categoriesRepository = categoryRepository;
            _logger = logger;
        }

      public async Task<CategoryDto> GetCategoryAsync(int id)
      {
        var category = await _categoriesRepository.GetCategoryAsync(id);
        return _mapper.Map<CategoryDto>(category);
      }

      public async Task<IEnumerable<CategoryDto>> GetCategoriesAsync()
      {
        var categories = await _categoriesRepository.GetCategoriesAsync();
        _logger.LogInformation("Get all categories.");
        return _mapper.Map<IEnumerable<CategoryDto>>(categories);;
      }

      public async Task<bool> CreateAsync(CategoryUpdateDto newCategory)
      {
         var subcategories = new List<CategoryDb>();
            var categoryToDb = new CategoryDb() {Name = newCategory.Name};        
            _categoriesRepository.Create(categoryToDb);
            await _categoriesRepository.SaveAllAsync();

            foreach(string childName in newCategory.Children)
            {
                if(!string.IsNullOrEmpty(childName))
                {
                    subcategories.Add(new CategoryDb() 
                    {
                        Name = childName,
                        ParentId = categoryToDb.Id
                    });
                }
            }         

            categoryToDb.Children = subcategories;

            if (await _categoriesRepository.SaveAllAsync()) return true;
            return false;
      }

      public async Task<bool> UpdateAsync(int id, CategoryUpdateDto categoryUpdate)
      {
          var categoryDb = await _categoriesRepository.GetCategoryAsync(id);
            _mapper.Map(categoryUpdate, categoryDb);
            categoryDb.Name = categoryUpdate.Name;
            for(int i = 0; i < 3; i++)
            {

            }
       
            _categoriesRepository.Update(categoryDb);
            
            if (await _categoriesRepository.SaveAllAsync()) return true;
            return false;
      }

      public async Task<bool> DeleteAsync(int id)
      {
          _categoriesRepository.Delete(id);

            if (await _categoriesRepository.SaveAllAsync()) return true;
            return false;
      }
   }
}