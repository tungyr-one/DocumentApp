using DocumentApp.Entities;
using Microsoft.EntityFrameworkCore;

namespace DocumentApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<CategoryDb> Categories { get; set; }
        public DbSet<DocDb> Docs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CategoryDb>()
            .Property(c => c.Id)
            .HasIdentityOptions(startValue: 7)
            .IsRequired();

            modelBuilder.Entity<CategoryDb>()
            .HasMany(c => c.Children)
            .WithOne()
            .HasForeignKey(c => c.ParentId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DocDb>()
            .HasOne(d => d.Category)
            .WithMany()
            .HasForeignKey(d => d.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);
        }
    }
}