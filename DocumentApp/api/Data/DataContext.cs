using api.Entities;
using DocumentApp.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<CategoryDb> Categories { get; set; }
        public DbSet<DocDb> Docs { get; set; }
    }
}