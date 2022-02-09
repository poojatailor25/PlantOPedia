using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlantOPedia.Data;
using PlantOPedia.Models;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PlantOPedia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        readonly PlantdbContext _context;
        public OrderController(PlantdbContext context)
        {
            _context = context;
        }
        // GET: api/<OrderController>
        [HttpGet]
        public IActionResult GetAll()
        {
           

            return Ok(_context.Orders.Include(order => order.Product)
                                      .Include(order => order.Users)
                                      .Where(order => order.IsDeleted == false)
                                      .ToList());

        }

        // GET api/<OrderController>/5
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
      
            return Ok(_context.Orders.Include(product => product.Product).Where(user => user.UserId == id ).ToList());

        }

        // POST api/<OrderController>
        [HttpPost]
        public IActionResult Post([FromBody] List<Order> orders)
        {
            foreach (var order in orders)
            {
                order.OrderDate = order.OrderDate.ToLocalTime();
            }
            _context.Orders.AddRange(orders);
            _context.SaveChanges();
            SuccessResponse successResponse = new SuccessResponse() { Code = "200", Message = "Success" };
            return Ok(successResponse);
        }

        // PUT api/<OrderController>/5            
        [HttpPut("{id}")]
        public void Put([FromBody] int id)
        {
        }

        // DELETE api/<OrderController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var exists = _context.Orders.Find(id);
            {
                //hard delete
                /*_context.Orders.Remove(new Order() { OrderId = id});
                _context.SaveChanges();

                SuccessResponse successResponse = new SuccessResponse() { Code = "200", Message = "Success" };
                return Ok(successResponse);*/
                
                if (exists != null)
                {
                    exists.IsDeleted = true;
                    _context.Orders.Update(exists);
                    _context.SaveChanges();
                }
                else
                {
                    ErrorResponse errorResponse = new ErrorResponse() { Code = "404", Message = "Not Found" };
                    return NotFound(errorResponse);
                }
                SuccessResponse successResponse = new SuccessResponse() { Code = "200", Message = "Success" };
                return Ok(successResponse);
            }
        }
    }
}
