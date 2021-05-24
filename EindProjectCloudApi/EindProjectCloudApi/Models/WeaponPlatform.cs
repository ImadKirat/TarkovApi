using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EindProjectCloudApi.Models
{
    public class WeaponPlatform
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public ICollection<Weapon> Weapons { get; set; }
    }
}