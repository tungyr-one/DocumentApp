using api.Data;
using api.Data.Repositories;
using api.Helpers;
using api.Interfaces;
using api.Interfaces.ServicesInterfaces;
using api.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
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