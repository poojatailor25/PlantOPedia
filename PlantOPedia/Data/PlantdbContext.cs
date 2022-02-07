using Microsoft.EntityFrameworkCore;
using PlantOPedia.Models;

namespace PlantOPedia.Data
{
    public class PlantdbContext : DbContext
    {
        public PlantdbContext()
        {
        }
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public PlantdbContext(DbContextOptions<PlantdbContext> options)
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
            : base(options)
        {
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }


    }
}
