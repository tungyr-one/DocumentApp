using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs;
using api.Entities;
using api.Interfaces;
using AutoMapper;
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
        public async Task<IEnumerable<DocDb>> GetDocsAsync()
        {
            var docsDb = await _context.Docs
            .Include(d => d.Category)
            .Include(d => d.Subcategory)              
            .ToListAsync();

            return docsDb;
        }

        public async Task<DocDb> GetDocAsync(int id)
        {
            return await _context.Docs
            .Include(d => d.Category)
            .Include(d => d.Subcategory)              
            .SingleOrDefaultAsync(d => d.Id == id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Create(DocDb doc)
        {
           _context.Add(doc).State = EntityState.Added;
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
    }
}