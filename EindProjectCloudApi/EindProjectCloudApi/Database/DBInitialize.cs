using EindProjectCloudApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EindProjectCloudApi.Database
{
    public class DBInitialize
    {
        public static void Initialize(BalisticsContext context)
        {
            //create the db
            context.Database.EnsureCreated();
            Caliber calli = null;  //bruh
            WeaponPlatform wpp = null;  //bruh
            Weapon wp = null;
            Attachements at = null;
            //are there already Calibers present?
            if (!context.Calibers.Any())
            {
                calli = new Caliber()
                {
                    Name = "12x70mm",
                    Rounds = new List<Round>(),
                    Weapons = new List<Weapon>(),
                };
                context.Calibers.Add(calli);
                context.SaveChanges();
            }
            //are there already rounds present?
            if (!context.Rounds.Any())
            {         
                var rd = new Round()
                {
                    Name = "12/70 AP-20 Slug",
                    Damage = 164,
                    PenPower = 37,
                    ArmorDamage = 65,
                    Accuracy = 125,
                    FragChance = 3,
                    Caliber = calli,
                };
                context.Rounds.Add(rd);
                context.SaveChanges();
            }
            //are there already weapons present?
            if (!context.Weapons.Any())
            {
                if (!context.WeaponPlatforms.Any())
                {
                    wpp = new WeaponPlatform()
                    {
                        Name = "Shotgun",
                        Weapons = new List<Weapon>()
                    };
                    context.WeaponPlatforms.Add(wpp);
                    context.SaveChanges();
                }
                wp = new Weapon()
                {
                    Name = "MP-153",
                    Caliber = calli,
                    Recoil = 43,
                    Platform = wpp,
                    WeaponAttachements = new List<WeaponAttachements>()
                };
                context.Weapons.Add(wp);
                context.SaveChanges();

            }
            if (!context.Attachements.Any())
            {
                at = new Attachements()
                {
                    Name = "HAMR",
                    WeaponAttachements = new List<WeaponAttachements>(),
                };
                context.Attachements.Add(at);
                context.SaveChanges();
            }
            if (!context.WeaponAttachements.Any())
            {
                var wa = new WeaponAttachements()
                {
                    WeaponId = wp.Id,
                    AttachementId = at.Id,
                };
                context.WeaponAttachements.Add(wa);
                context.SaveChanges();
            }

        }
    }
}
