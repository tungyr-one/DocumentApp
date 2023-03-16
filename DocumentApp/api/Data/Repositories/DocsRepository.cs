using System.Collections.Generic;
using System.Threading.Tasks;
using api.Entities;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Data.Repositories
{
    public class DocsRepository:IDocsRepository
    {
        private readonly DataContext _context;

        public DocsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<DocDb> GetDocAsync(int id)
        {
            return await _context.Docs.AsNoTracking()
            .Include(d => d.Category)           
            .FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task<List<DocDb>> GetDocsAsync()
        {
            var docsDb = await _context.Docs.AsNoTracking()
            .Include(d => d.Category)        
            .ToListAsync();

            return docsDb;
        }

        public void Create(DocDb doc)
        {
           _context.Docs.
           Add(doc).State = EntityState.Added;
        }

         public void Update(DocDb doc)
        {            
           _context.Entry(doc).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            var docToDelete = _context.Docs.Find(id);
            _context.Entry(docToDelete).State = EntityState.Deleted; 
        }     

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}