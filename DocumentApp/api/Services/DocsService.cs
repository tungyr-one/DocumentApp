using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Controllers;
using api.DTOs;
using api.Entities;
using api.Interfaces;
using AutoMapper;
using Microsoft.Extensions.Logging;

namespace api.Services
{
   public class DocsService : IDocsService
   {
      private readonly IDocsRepository _docsRepository;
      private readonly ICategoriesRepository _categoriesRepository;
      private readonly ILogger<DocsService> _logger;
      private readonly IMapper _mapper;

      public DocsService(IDocsRepository docsRepository,
            ICategoriesRepository categoriesRepository,
            ILogger<DocsService> logger,
            IMapper mapper)
      {
         _docsRepository = docsRepository;
         _categoriesRepository = categoriesRepository;
         _logger = logger;
         _mapper = mapper;
      }
      public async Task<DocDto> GetDocAsync(int id)
      {
         var doc = await _docsRepository.GetDocAsync(id);
         return _mapper.Map<DocDto>(doc);
      }

      public async Task<IEnumerable<DocDto>> GetDocsAsync()
      {
         var docs = await _docsRepository.GetDocsAsync();
         return _mapper.Map<IEnumerable<DocDto>>(docs);
      }

      public async Task<bool> CreateAsync(DocNewDto newDoc)
      {
         var docToDb = _mapper.Map<DocDb>(newDoc);
         var category = await _categoriesRepository.GetCategoryAsync(newDoc.CategoryId);
         docToDb.Category = category;

         _docsRepository.Create(docToDb);

         return await _docsRepository.SaveAllAsync();
      }

      public async Task<bool> UpdateAsync(int id, DocUpdateDto docUpdate)
      {
         var docDb = await _docsRepository.GetDocAsync(id);
         _mapper.Map(docUpdate, docDb);
         var category = await _categoriesRepository.GetCategoryByNameAsync(docUpdate.CategoryName);
         docDb.Category = category;

         _docsRepository.Update(docDb);

         return await _docsRepository.SaveAllAsync();
      }

      public async Task<bool> DeleteAsync(int id)
      {
         _docsRepository.Delete(id);
         return await _docsRepository.SaveAllAsync();
      }
   }
}