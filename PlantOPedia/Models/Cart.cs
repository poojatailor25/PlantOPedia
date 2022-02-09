using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlantOPedia.Models
{
    public class Cart
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CartId { get; set; }
        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        public Product? Product { get; set; }
        [ForeignKey("Users")]
        public Guid UserId { get; set; }
        public Users? User { get; set; }

    }
}
