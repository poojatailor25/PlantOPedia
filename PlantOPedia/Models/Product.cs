using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace PlantOPedia.Models
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ProductId { get; set; }
        [Required, MaxLength(50)]
        public string ProductName { get; set; }
        [Required, MaxLength(1000)]
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        [ForeignKey("ProductType")]
        public Guid ProductTypeId { get; set; }
        public ProductType? ProductType { get; set; }

        public bool IsDeleted { get; set; }
    }
}
