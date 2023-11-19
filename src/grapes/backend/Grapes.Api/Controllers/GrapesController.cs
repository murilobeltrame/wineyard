using Grapes.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Grapes.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class GrapesController : ControllerBase
{
    private readonly ApplicationContext _context;

    public GrapesController(ApplicationContext context) => _context = context;

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GrapesRequest request)
    {
        var query = _context.Grapes.AsQueryable();
        if (!string.IsNullOrWhiteSpace(request.Name))
        {
            query = query.Where(w =>
                w.Name.StartsWith(request.Name) ||
                (w.AlternativeName != null && w.AlternativeName.StartsWith(request.Name)));
        }
        query = query
            .OrderBy(o => o.Name)
            .Skip((int)request.Skip)
            .Take(request.Take);
        return Ok(await query.AsNoTracking().ToListAsync());
    }
}

public class GrapesRequest
{
    public string Name { get; set; } = string.Empty;
    public uint Skip { get; set; } = 0;
    public ushort Take { get; set; } = 10;
}