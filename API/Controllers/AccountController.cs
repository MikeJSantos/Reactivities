using System.Linq.Expressions;
using API.DTO;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private UserManager<AppUser> _userManager;
    private readonly TokenService _tokenService;

    public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
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
            Token = _tokenService.CreateToken(user),
            Image = null,
        };
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
    {
        var users = _userManager.Users;

        if (await users.AnyAsync(u => u.UserName == registerDTO.UserName))
            return BadRequest("UserName is already taken");

        if (await users.AnyAsync(u => u.Email == registerDTO.Email))
            return BadRequest("Email is already taken");

        var user = new AppUser
        {
            UserName = registerDTO.UserName,
            Email = registerDTO.Email,
            DisplayName = registerDTO.DisplayName,
        };
        var result = await _userManager.CreateAsync(user, registerDTO.Password);
        if (!result.Succeeded) return BadRequest(result.Errors);

        return new UserDTO
        {
            DisplayName = user.DisplayName,
            UserName = user.UserName,
            Token = _tokenService.CreateToken(user),
            Image = null,
        };
    }
}