using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZwajApp.API.Data;
using ZwajApp.API.Dtos;
using ZwajApp.API.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace ZwajApp.API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthRepository authRepository;
    private readonly IConfiguration configuration;
    public AuthController(IAuthRepository authRepository, IConfiguration configuration)
    {
        this.authRepository = authRepository;
        this.configuration = configuration;
    }


    // Post auth/register
    [HttpPost("register")]
    public async Task<IActionResult> Register(UserForRegisterDto userDto)
    {
        userDto.Username = userDto.Username.ToLower();
        var userExists = await authRepository.UserExists(userDto.Username);
        if (userExists)
        {
            return BadRequest("Username already exists");
        }

        var userToCreate = new User
        {
            Username = userDto.Username,
        };

        var createdUser = await authRepository.Register(userToCreate, userDto.Password);

        return StatusCode(201);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserForLoginDto userDto)
    {
        var user = await authRepository.Login(userDto.Username.ToLower(), userDto.Password);
        if (user == null)
        {
            return Unauthorized();
        }

        //create token
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username)
        };

        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(configuration.GetSection("TokenKey").Value));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(1),
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return Ok(new
        {
            token = tokenHandler.WriteToken(token)
        });
    }
}
