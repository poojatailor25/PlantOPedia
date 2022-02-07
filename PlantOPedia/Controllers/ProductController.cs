using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlantOPedia.Data;
using PlantOPedia.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PlantOPedia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        readonly PlantdbContext _context;
        public ProductController(PlantdbContext context)
        {
            _context = context;
        }
        // GET: api/<ProductController>
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.Products.Include(p => p.ProductType).
                                    ThenInclude(c => c.Category).Where(product => product.IsDeleted == false).ToList());
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            return Ok(_context.Products.Include(p => p.ProductType).
                                    ThenInclude(c => c.Category).FirstOrDefault(product => product.ProductId == id && product.IsDeleted == false)); ;
                
        }

        // POST api/<ProductController>
        [HttpPost]
        public IActionResult Post([FromBody] Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
            SuccessResponse successResponse = new SuccessResponse() { Code = "200", Message = "Success" };
            return Ok(successResponse);
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public IActionResult Put(Guid id, [FromBody] Product product)
        {
            //var Productexists = _context.Products.FirstOrDefault(p => p.ProductId.Equals(id));

            var exists = _context.Products.AsNoTracking().FirstOrDefault(product => product.ProductId == id && product.IsDeleted == false);
            if(exists != null)
            {
                _context.Products.Update(product);
                _context.SaveChanges();

                SuccessResponse successResponse = new SuccessResponse() { Code = "200", Message = "Success" };
                return Ok(successResponse);
            }

            ErrorResponse errorResponse = new ErrorResponse() { Code = "404", Message = "Not Found" };
            return NotFound(errorResponse);

        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            //Soft Delete
            var exists = _context.Products.Find(id);
            if (exists != null)
        {
                exists.IsDeleted = true;
                _context.Products.Update(exists);
                _context.SaveChanges();

                SuccessResponse successResponse = new SuccessResponse() { Code = "200", Message = "Success" };
                return Ok(successResponse);
            }
            else
            {
                ErrorResponse errorResponse = new ErrorResponse() { Code = "404", Message = "Not Found" };
                return NotFound(errorResponse);
            }

        }
    }
}
