using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Wines.Api.Models;

namespace Wines.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class WinesController : ControllerBase
{
    private readonly ApplicationContext _context;

    public WinesController(ApplicationContext context) => _context = context;

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] WinesRequest request)
    {
        var query = _context.Wines
            .Include(i => i.Grapes)
            .AsQueryable();
        if (request.Countries?.Any() ?? false)
        {
            query = query.Where(w => request.Countries.Contains(w.Country));
        }
        if (request.Grapes?.Any() ?? false)
        {
            query = query.Where(w => w.Grapes.Any(ww => request.Grapes.Contains(ww.Name)));
        }
        query = query
            .Skip((int)request.Skip)
            .Take(request.Take);
        return Ok(await query.Select(s => new
        {
            s.Id,
            s.Label,
            s.Winery,
            s.Country,
            Grapes = s.Grapes.Select(ss => ss.Name)
        }).AsNoTracking().ToListAsync());
    }
}

public class WinesRequest
{
    public IEnumerable<string>? Grapes { get; set; }
    public IEnumerable<string>? Countries { get; set; }
    public uint Skip { get; set; } = 0;
    public ushort Take { get; set; } = 10;
}