using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using api.Helpers;
using DocumentApp.DTOs;
using DocumentApp.Entities;
using DocumentApp.Interfaces.RepositoriesInterfaces;
using Microsoft.EntityFrameworkCore;

namespace DocumentApp.Data.Repositories
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
            userParams.SortBy = userParams.SortBy.CapitalizeFirstLetter();

            var query = _context.Docs.Include(d => d.Category).AsQueryable();

            if(!string.IsNullOrWhiteSpace(userParams.FilterBy))
            {
                query = query.Where(d => d.Name.StartsWith(userParams.FilterBy));
            }

            query = userParams.SortOrder == "asc"
            ? query.OrderBy(ResolveOrderFieldExpression(userParams))
            : query.OrderByDescending(ResolveOrderFieldExpression(userParams));

            return await query.AsNoTracking().ToArrayAsync();
        }

        public async Task<bool> CreateAsync(DocDb doc)
        {
           _context.Docs.
           Add(doc).State = EntityState.Added;
           return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateAsync(DocDb doc)
        {            
           _context.Entry(doc).State = EntityState.Modified;
           return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var docToDelete = await _context.Docs.FindAsync(id);
            _context.Entry(docToDelete).State = EntityState.Deleted; 
            return await _context.SaveChangesAsync() > 0;
        }     

        async Task<bool> IDocsRepository.IsDocumentWithCategoryRelationExistsAsync(int categoryId)
        {
            return await _context.Docs.AnyAsync(d => d.Category.Id == categoryId);
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