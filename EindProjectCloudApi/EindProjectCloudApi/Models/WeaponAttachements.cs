using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EindProjectCloudApi.Models
{
    public class WeaponAttachements
    {
        public int WeaponId { get; set; }
        public int AttachementId { get; set; }
        public Weapon Weapon { get; set; }
        public Attachements Attachements { get; set; }
    }
}
