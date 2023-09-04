using DocumentApp.Data;
using DocumentApp.Data.Repositories;
using DocumentApp.Helpers;
using DocumentApp.Interfaces.RepositoriesInterfaces;
using DocumentApp.Interfaces.ServicesInterfaces;
using DocumentApp.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DocumentApp.Extensions
{
    public static class ApplicationServiceExtenstions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ICategoriesRepository, CategoriesRepository>();
            services.AddScoped<IDocsRepository, DocsRepository>();
            services.AddScoped<IDocsService, DocsService>();
            services.AddScoped<ICategoriesService, CategoriesService>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options=>
            {
                options.UseNpgsql(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }    
    }
}