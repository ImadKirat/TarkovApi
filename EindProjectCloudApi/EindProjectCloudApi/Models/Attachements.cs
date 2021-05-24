using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace EindProjectCloudApi.Models
{
    public class Attachements
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<WeaponAttachements> WeaponAttachements { get; set; }
    }
}
