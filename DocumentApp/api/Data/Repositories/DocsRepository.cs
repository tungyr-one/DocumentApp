using System.Linq;
using System.Threading.Tasks;
using api.DTOs;
using api.Entities;
using api.Interfaces;
using DocumentApp.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Data.Repositories
{
    public class DocsRepository: IDocsRepository
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

        public async Task<DocDb[]> GetDocsAsync(UserParams userParams)
        {
            // var docsDb = await _context.Docs.AsNoTracking()
            // .Include(d => d.Category)
            // .Skip((userParams.PageNumber - 1) * userParams.PageSize).Take(userParams.PageSize).ToArrayAsync();

            // var docsDb = await _context.Docs.AsNoTracking()
            // .Include(d => d.Category)        
            // .ToArrayAsync();

            return docsDb;
        }

        public async Task<bool> Create(DocDb doc)
        {
           _context.Docs.
           Add(doc).State = EntityState.Added;
           return await _context.SaveChangesAsync() > 0;
        }

         public async Task<bool> Update(DocDb doc)
        {            
           _context.Entry(doc).State = EntityState.Modified;
           return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(int id)
        {
            var docToDelete = _context.Docs.Find(id);
            _context.Entry(docToDelete).State = EntityState.Deleted; 
            return await _context.SaveChangesAsync() > 0;
        }     

        async Task<bool> IDocsRepository.IsDocumentWithCategoryRelationExists(int categoryId)
        {
            return await _context.Docs.AnyAsync(d => d.Category.Id == categoryId);
        }

   }
}