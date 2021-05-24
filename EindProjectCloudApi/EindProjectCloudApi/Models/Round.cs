using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EindProjectCloudApi.Models
{
    public class Round
    {
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        [Display(Name = "Weapon name")]
        public string Name { get; set; }
        [Required]
        public int Damage { get; set; }
        [Required]
        public int PenPower { get; set; }
        [Required]
        public int ArmorDamage { get; set; }
        [Required]
        public int Accuracy { get; set; }
        [Required]
        [Range(0,100)]
        public int FragChance { get; set; }
        public Caliber Caliber { get; set; }
        public int caliberId { get; set; }
    }
}
