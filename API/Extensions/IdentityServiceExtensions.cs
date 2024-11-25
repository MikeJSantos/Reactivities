using System.Text;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions;

public static class IdentityServiceExtensions
{
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {
        services
            .AddIdentityCore<AppUser>(opt => opt.Password.RequireNonAlphanumeric = false)
            .AddEntityFrameworkStores<DataContext>();
        // TODO: merge w/ TokenService.cs
        var key = "73J{`S*4z*Fs)1Q?KB4e'qAk[zv=D}4?IUKaJ`1]DITuHwb!P0tE4ABXXvw$Hd#x];2p(8|";
        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt =>
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateIssuerSigningKey = true,
                }
            );
        services.AddScoped<TokenService>();

        return services;
    }
}