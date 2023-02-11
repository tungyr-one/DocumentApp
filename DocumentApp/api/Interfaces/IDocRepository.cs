using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs;
using api.Entities;

namespace api.Interfaces
{
    public interface IDocsRepository
    {
        Task<IEnumerable<DocDb>> GetDocsAsync();
        Task<DocDb> GetDocAsync(int id);
        void Update(DocDb doc);
        void Create(DocDb doc);
        void Delete(int id);
        Task<bool> SaveAllAsync();


    }
}