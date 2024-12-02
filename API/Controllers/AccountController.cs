using System.Security.Claims;
using API.DTO;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController(UserManager<AppUser> userManager, TokenService tokenService) : ControllerBase
{
    private UserManager<AppUser> _userManager = userManager;
    private readonly TokenService _tokenService = tokenService;

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null) return Unauthorized();

        var success = await _userManager.CheckPasswordAsync(user, dto.Password);
        if (!success) return Unauthorized();

        return GetUserDTO(user);
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
    {
        var users = _userManager.Users;

        if (await users.AnyAsync(u => u.UserName == registerDTO.UserName))
            ModelState.AddModelError("username", "Username taken");

        if (await users.AnyAsync(u => u.Email == registerDTO.Email))
            ModelState.AddModelError("email", "Email taken");

        if (ModelState.ErrorCount > 0) return ValidationProblem();

        var user = new AppUser
        {
            UserName = registerDTO.UserName,
            Email = registerDTO.Email,
            DisplayName = registerDTO.DisplayName,
        };
        var result = await _userManager.CreateAsync(user, registerDTO.Password);
        if (!result.Succeeded) return BadRequest(result.Errors);

        return GetUserDTO(user);
    }

    [HttpGet]
    public async Task<ActionResult<UserDTO>> GetCurrentUser()
    {
        var email = User.FindFirstValue(ClaimTypes.Email);
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null) return BadRequest("");

        return GetUserDTO(user);
    }

    private UserDTO GetUserDTO(AppUser user) => new()
    {
        DisplayName = user.DisplayName,
        UserName = user.UserName,
        Token = _tokenService.CreateToken(user),
        Image = null,
    };
}