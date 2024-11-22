using API.DTO;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private UserManager<AppUser> _userManager;

    public AccountController(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null) return Unauthorized();

        var success = await _userManager.CheckPasswordAsync(user, dto.Password);
        if (!success) return Unauthorized();

        return new UserDTO
        {
            UserName = user.UserName,
            DisplayName = user.DisplayName,
            Token = "token",
            Image = null,
        };
    }
}