using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DocumentApp.DTOs;
using DocumentApp.Entities;
using DocumentApp.Helpers;
using DocumentApp.Interfaces.RepositoriesInterfaces;
using DocumentApp.Interfaces.ServicesInterfaces;
using Microsoft.EntityFrameworkCore;

namespace DocumentApp.Services
{
   public class DocsService : IDocsService
   {
      private readonly IDocsRepository _docsRepository;
      private readonly IMapper _mapper;

      public DocsService(IDocsRepository docsRepository,
          IMapper mapper)
      {
         _docsRepository = docsRepository;
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
         return await _docsRepository.Create(docToDb);
      }

      public async Task<bool> UpdateAsync(int id, DocUpdateDto docUpdate)
      {
         var docDb = await _docsRepository.GetDocAsync(id);
         _mapper.Map(docUpdate, docDb);
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