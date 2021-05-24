using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace EindProjectCloudApi.Models
{
    public class Caliber
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<Round> Rounds { get; set; }

        public ICollection<Weapon> Weapons { get; set; }
    }
}
