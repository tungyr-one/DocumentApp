using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DocumentApp.DTOs;
using DocumentApp.Entities;
using DocumentApp.Helpers;
using DocumentApp.Interfaces.RepositoriesInterfaces;
using DocumentApp.Interfaces.ServicesInterfaces;

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

         var docs = await _docsRepository.GetDocsAsync(userParams);

         return Pagination<DocDto>.ToPageResult(
         _mapper.Map<IEnumerable<DocDto>>(docs),
         userParams.Offset,
         userParams.PageSize);         
      }

      public async Task<bool> CreateAsync(DocNewDto newDoc)
      {
         var docToDb = _mapper.Map<DocDb>(newDoc);
         return await _docsRepository.CreateAsync(docToDb);
      }

      public async Task<bool> UpdateAsync(int id, DocUpdateDto docUpdate)
      {
         var docDb = await _docsRepository.GetDocAsync(id);
         _mapper.Map(docUpdate, docDb);
         docDb.Version++;
         if(!await _docsRepository.UpdateAsync(docDb)) 
         {
            throw new ArgumentException("Failed to update document");
         }
         return true;
      }

      public async Task<bool> DeleteAsync(int id)
      {
         return await _docsRepository.DeleteAsync(id);
      }
   }
}