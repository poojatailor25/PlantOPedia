using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace PlantOPedia.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid OrderId { get; set; }
        
        public DateTime OrderDate { get; set; }
        [Required, MaxLength(100)]
        public string Address { get; set; }
        [ForeignKey("Users")]
        public Guid UserId { get; set; }
        public Users? Users { get; set; }

        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        public Product? Product { get; set; }
        public bool IsDeleted { get; set; }
    }
}
