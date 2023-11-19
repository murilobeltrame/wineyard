using Countries.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Countries.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class CountriesController : ControllerBase
{
    private readonly ApplicationContext _context;

    public CountriesController(ApplicationContext context) => _context = context;

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] CountriesRequest request)
    {
        var query = _context.Countries.AsQueryable();
        if (!string.IsNullOrWhiteSpace(request.Name))
        {
            query = query.Where(w => w.Name.StartsWith(request.Name));
        }
        query = query
            .OrderBy(o => o.Name)
            .Skip((int)request.Skip)
            .Take(request.Take);
        return Ok(await query.AsNoTracking().ToListAsync());
    }
}

public class CountriesRequest
{
    public string Name { get; set; } = string.Empty;
    public uint Skip { get; set; } = 0;
    public ushort Take { get; set; } = 10;
}