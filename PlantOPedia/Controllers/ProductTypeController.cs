using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlantOPedia.Data;
using PlantOPedia.Models;

namespace PlantOPedia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTypeController:ControllerBase
    {
        readonly PlantdbContext _context;
        public ProductTypeController(PlantdbContext context)
        {
            _context = context;
        }
        // GET: api/<ProductController>
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.ProductTypes.Include(c => c.Category).ToList());
        }
    }
}
