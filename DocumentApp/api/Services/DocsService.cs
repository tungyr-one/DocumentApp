using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Controllers;
using api.DTOs;
using api.Entities;
using api.Helpers;
using api.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DocumentApp.Entities;
using Microsoft.EntityFrameworkCore;
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

      public async Task<Pagination<DocDto>> GetDocsAsync(UserParams userParams)
      {
         var query = _docsRepository.GetDocsAsync();

          if(!string.IsNullOrWhiteSpace(userParams.filterBy))
         {
            query = query.Where(d => d.Name == userParams.filterBy);
         }

         return await Pagination<DocDto>.CreateAsync(
         query.AsNoTracking().ProjectTo<DocDto>(_mapper.ConfigurationProvider),
         userParams.PageNumber,
         userParams.PageSize);         
      }

      public async Task<bool> CreateAsync(DocNewDto newDoc)
      {
         var docToDb = _mapper.Map<DocDb>(newDoc);
         var category = await _categoriesRepository.GetCategoryAsync(newDoc.CategoryId);
         docToDb.Category = category;
         return await _docsRepository.Create(docToDb);
      }

      public async Task<bool> UpdateAsync(int id, DocUpdateDto docUpdate)
      {
         var docDb = await _docsRepository.GetDocAsync(id);
         _mapper.Map(docUpdate, docDb);
         var category = await _categoriesRepository.GetCategoryAsync(docUpdate.CategoryId);
         docDb.Category = category;

          return await _docsRepository.Update(docDb);
      }

      public async Task<bool> DeleteAsync(int id)
      {
         return await _docsRepository.Delete(id);
      }
   }
}