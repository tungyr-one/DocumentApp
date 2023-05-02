using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Data;
using api.DTOs;
using api.Entities;
using api.Exceptions;
using api.Interfaces;
using api.Interfaces.ServicesInterfaces;
using API.Errors;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace api.Services
{
   public class CategoriesService : ICategoriesService
   {
        private readonly ILogger<CategoriesService> _logger;
        private ICategoriesRepository _categoriesRepository { get; }
        private IMapper _mapper { get; }
        private IDocsRepository _docsRepository;


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
        return _mapper.Map<CategoryDto[]>(categories);;
      }

      public async Task<bool> CreateAsync(CategoryDto newCategory)
      {
          var categoryToDb = _mapper.Map<CategoryDb>(newCategory);    
            _categoriesRepository.Create(categoryToDb);

            return await _categoriesRepository.SaveAllAsync();
      }

      public async Task<bool> UpdateAsync(int id, CategoryDto categoryUpdate)
      {
          var categoryDb = await _categoriesRepository.GetCategoryAsync(id);
            _mapper.Map(categoryUpdate, categoryDb);      
            _categoriesRepository.Update(categoryDb);
            
            return await _categoriesRepository.SaveAllAsync();
      }

      public async Task<bool> DeleteAsync(int id)
      {
            var categoryToDelete = await _categoriesRepository.GetCategoryAsync(id);

            if (categoryToDelete.Children.Count > 0)
            {
                throw new ValidationException("Category has subcategories, delete them first");
            }

            if (await _docsRepository.IsDocumentWithCategoryRelationExists(categoryToDelete.Id))
            {
                throw new ValidationException("Category has documents, delete them first");
            }

          _categoriesRepository.Delete(categoryToDelete);

          return await _categoriesRepository.SaveAllAsync();
      }
   }
}