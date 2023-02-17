using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<CategoryDb> Categories { get; set; }
        public DbSet<SubcategoryDb> Subcategories { get; set; }
        public DbSet<DocDb> Docs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<DocDb>(d =>{
            d.Property(p => p.Id).UseIdentityAlwaysColumn();
            });

            modelBuilder.Entity<CategoryDb>(d =>{
            d.Property(p => p.Id).UseIdentityAlwaysColumn();
            });

            modelBuilder.Entity<SubcategoryDb>(d =>{
            d.Property(p => p.Id).UseIdentityAlwaysColumn();
            });
        }
    }
}