using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlantOPedia.Data;
using PlantOPedia.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Text;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PlantOPedia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        readonly PlantdbContext _context;
        public UserController(PlantdbContext context)
        {
            _context = context;
        }
        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            return Ok(_context.Users.FirstOrDefault(User => User.UserId == id && User.IsDeleted == false)); ;
        }

        // POST api/<UserController>
        [HttpPost]
        public IActionResult Post([FromBody] Users user)
        {
            const string Salt = "CGYzqeN4plZekNC88Umm1Q==";
            byte[] bytesSalt = Encoding.ASCII.GetBytes(Salt);

            user.Password = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: user.Password,
            salt: bytesSalt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 32));

            _context.Users.Add(user);
            _context.SaveChanges();
            SuccessResponse successResponse = new SuccessResponse() { Code = "200", Message = "Success" };
            return Ok(successResponse);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public IActionResult Put(Guid id, [FromBody] Users user)
        {
            var exists = _context.Users.AsNoTracking().FirstOrDefault(user => user.UserId == id && user.IsDeleted == false);
            if (exists != null)
            {
                _context.Users.Update(user);
                _context.SaveChanges();

                SuccessResponse successResponse = new SuccessResponse() { Code = "200", Message = "Success" };
                return Ok(successResponse);
            }

            ErrorResponse errorResponse = new ErrorResponse() { Code = "404", Message = "Not Found" };
            return NotFound(errorResponse);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
