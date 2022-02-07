using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace PlantOPedia.Models
{
    public class Users
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid UserId { get; set; }
        [Required, StringLength(50)]
        public string Name { get; set; }
        [Required, EmailAddress(ErrorMessage = "Please enter valid email id !!")]
        public string Email { get; set; }
        [Required, StringLength(50, MinimumLength = 6, ErrorMessage = "Password must contain 6 to 50 range")]
        public string Password { get; set; }
        public string Address { get; set; }
        [Required, MaxLength(10)]
        public string MobileNo { get; set; }
        [ForeignKey("Role")]
        public Guid RoleId { get; set; }
        public Role Role { get; set; }
        public bool IsDeleted { get; set; }
    }
}
