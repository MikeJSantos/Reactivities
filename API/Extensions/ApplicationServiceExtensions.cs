using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static void AddApplicationServices(this IServiceCollection services, string connectionString)
    {
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddDbContext<DataContext>(optionsAction => optionsAction.UseSqlite(connectionString));
        services.AddCors(opt =>
        {
            opt.AddPolicy("CorsPolicy", policy =>
            {
                policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
            });
        });
        services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssembly(typeof(Application.Activities.List.Handler).Assembly)
        );
        services.AddAutoMapper(typeof(MappingProfiles).Assembly);
    }
}
