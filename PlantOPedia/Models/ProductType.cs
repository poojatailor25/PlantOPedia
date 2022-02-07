using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlantOPedia.Models
{
    public class ProductType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ProductTypeId { get; set; }
        public ProductSubType ProductSubType { get; set; }
        [ForeignKey("Category")]
        public Guid CategoryId { get; set; }
        public Category Category { get; set; }
        [Required]
        public bool IsDeleted { get; set; }
    }
}
