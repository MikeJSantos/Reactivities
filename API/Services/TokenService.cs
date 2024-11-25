using Domain;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace API.Services;

public class TokenService
{
    public string CreateToken(AppUser user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, user.UserName),
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.Email, user.Email),
        };
        // TODO: merge w/ IdentityServiceExtensions.cs
        var key = "73J{`S*4z*Fs)1Q?KB4e'qAk[zv=D}4?IUKaJ`1]DITuHwb!P0tE4ABXXvw$Hd#x];2p(8|";
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var securityTokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature)
        };
        var token = new JsonWebTokenHandler().CreateToken(securityTokenDescriptor);

        return token;
    }
}