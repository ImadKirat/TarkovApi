using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EindProjectCloudApi.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace EindProjectCloudApi.Database
{
    public class BalisticsContext : IdentityDbContext
    {
        public BalisticsContext(DbContextOptions<BalisticsContext> options) : base(options)
        {

        }
        public DbSet<Attachements> Attachements { get; set; }
        public DbSet<Caliber> Calibers { get; set; }
        public DbSet<Round> Rounds { get; set; }
        public DbSet<Weapon> Weapons { get; set; }
        public DbSet<WeaponPlatform> WeaponPlatforms { get; set; }
        public DbSet<WeaponAttachements> WeaponAttachements { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // id user zit in modelbuilder
            modelBuilder.Entity<Caliber>()
                .HasMany(c => c.Weapons)
                .WithOne(e => e.Caliber);

            modelBuilder.Entity<Caliber>()
               .HasMany(c => c.Rounds)
               .WithOne(e => e.Caliber);

            modelBuilder.Entity<Round>()
               .HasOne(c => c.Caliber)
               .WithMany(e => e.Rounds)
               .HasForeignKey(f => f.caliberId);

            modelBuilder.Entity<Weapon>()
                .HasOne(c => c.Caliber)
                .WithMany(e => e.Weapons)
                .HasForeignKey(f => f.CaliberId)
                .IsRequired();

            modelBuilder.Entity<Weapon>()
                .HasOne(c => c.Platform)
                .WithMany(e => e.Weapons)
                .HasForeignKey(f => f.PlatformId)
                .IsRequired();
            modelBuilder.Entity<Weapon>()
                .HasMany(c => c.WeaponAttachements)
                .WithOne(e => e.Weapon);

            modelBuilder.Entity<Attachements>()
                .HasMany(c => c.WeaponAttachements)
                .WithOne(e => e.Attachements);

            modelBuilder.Entity<WeaponPlatform>()
               .HasMany(c => c.Weapons)
               .WithOne(e => e.Platform);

            modelBuilder.Entity<WeaponAttachements>()
                .HasKey(bc => new { bc.WeaponId, bc.AttachementId });

            modelBuilder.Entity<WeaponAttachements>()
                .HasOne(bc => bc.Weapon)
                .WithMany(b => b.WeaponAttachements)
                .HasForeignKey(bc => bc.WeaponId);

            modelBuilder.Entity<WeaponAttachements>()
                .HasOne(bc => bc.Attachements)
                .WithMany(c => c.WeaponAttachements)
                .HasForeignKey(bc => bc.AttachementId);

        }
    }
}
