using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace EindProjectCloudApi.Models
{
    public class Weapon
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Recoil { get; set; }
        public int PlatformId { get; set; }
        public int CaliberId { get; set; }
        public WeaponPlatform Platform { get; set; }
        public Caliber Caliber { get; set; }
        public ICollection<WeaponAttachements> WeaponAttachements { get; set; }
    }
}