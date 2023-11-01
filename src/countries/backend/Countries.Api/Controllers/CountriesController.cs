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
    public async Task<IActionResult> Get()
    {
        return Ok(await _context.Countries.ToListAsync());
    }
}