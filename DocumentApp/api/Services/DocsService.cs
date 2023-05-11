using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
         userParams.SortBy = string.Concat(userParams.SortBy[0].ToString().ToUpper(), userParams.SortBy.AsSpan(1));

         var query = _docsRepository.GetDocsAsync();

         if(!string.IsNullOrWhiteSpace(userParams.FilterBy))
         {
            query = query.Where(d => d.Name.StartsWith(userParams.FilterBy));
         }

         query = userParams.SortOrder == "asc"
            ? query.OrderBy(ResolveOrderFieldExpression(userParams))
            : query.OrderByDescending(ResolveOrderFieldExpression(userParams));

         return await Pagination<DocDto>.CreateAsync(
         query.AsNoTracking().ProjectTo<DocDto>(_mapper.ConfigurationProvider),
         userParams.Offset,
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
         docDb.Version++;

         return await _docsRepository.Update(docDb);
      }

      public async Task<bool> DeleteAsync(int id)
      {
         return await _docsRepository.Delete(id);
      }

      private static Expression<Func<DocDb, object>> ResolveOrderFieldExpression(UserParams userParams)
      => userParams.SortBy switch
      {
      nameof(DocDb.Name) => x => x.Name,
      nameof(DocDb.Edited) => x => x.Edited,
      nameof(DocDb.Created) => x => x.Created,
      nameof(DocDb.Version) => x => x.Version,
      nameof(DocDb.Author) => x => x.Author,
      nameof(DocDb.Category) => x => x.Category,
      _ => x => x.Id
      };
   }
}