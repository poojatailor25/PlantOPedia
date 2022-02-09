using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlantOPedia.Data;
using PlantOPedia.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PlantOPedia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        readonly PlantdbContext _context;
        public CartController(PlantdbContext context)
        {
            _context = context;
        }
        // GET: api/<CartController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<CartController>/5
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            return Ok(_context.Carts.Include(p => p.Product).ThenInclude(p => p.ProductType).ThenInclude(c => c.Category).
                        Include(u => u.User).Where(user => user.UserId == id).ToList());
        }

        // POST api/<CartController>
        [HttpPost]
        public IActionResult Post([FromBody] Cart cart)
        {
            _context.Carts.Add(cart);
            _context.SaveChanges();
            SuccessResponse successResponse = new SuccessResponse() { Code = "200", Message = "Success" };
            return Ok(successResponse);
        }

        // PUT api/<CartController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CartController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            _context.Carts.Remove(new Cart() { CartId = id});
            _context.SaveChanges();

            SuccessResponse successResponse = new SuccessResponse() { Code = "200", Message = "Success" };
            return Ok(successResponse);
        }
    }
}
