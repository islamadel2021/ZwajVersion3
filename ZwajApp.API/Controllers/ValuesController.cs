using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZwajApp.API.Data;

namespace ZwajApp.API.Controllers;

[ApiController]
[Route("[controller]")]
public class ValuesController : ControllerBase
{
    private readonly DataContext context;

    public ValuesController(DataContext context)
    {
        this.context = context;
    }

    // GET api/values
    [HttpGet]
    public async Task<IActionResult> GetValues()
    {
        var values = await context.Values.ToListAsync();
        return Ok(values);
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetValue(int id)
    {
        var value = await context.Values.FirstOrDefaultAsync(x => x.Id == id);
        return Ok(value);
    }
}
