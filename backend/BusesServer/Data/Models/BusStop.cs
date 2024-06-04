using System.ComponentModel.DataAnnotations;

namespace BusesServer.Data.Models
{
    public class BusStop
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(50), Required]
        public string Name { get; set; }
    }
}
