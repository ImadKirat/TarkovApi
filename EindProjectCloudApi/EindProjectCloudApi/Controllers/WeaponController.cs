using EindProjectCloudApi.Database;
using EindProjectCloudApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
namespace EindProjectCloudApi.Controllers
{


    namespace EindProjectCloudApi.Controllers
    {
        [Route("api/v1/Weapon")]
        [ApiController]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public class WeaponController : ControllerBase
        {
            private readonly BalisticsContext context;

            public WeaponController(BalisticsContext context)
            {
                this.context = context;
            }
            [HttpGet] //api/v1/Weapon
            public List<Weapon> GetAllWeapons()
            {
                return context.Weapons
                    .Include(c => c.Caliber)
                    .Include(c => c.Caliber)
                    .ThenInclude(c => c.Rounds)
                    .Include(f => f.Platform)
                    .Include(e => e.WeaponAttachements)
                    .ThenInclude(a => a.Attachements)
                    .ToList();
            }
            [Route("{id}/attachement")]
            [HttpGet] //api/v1/Weapon
            public IActionResult GetAttachementForWeapon(int id)
            {
                var p = context.Weapons.Include(w => w.WeaponAttachements)
                    .ThenInclude(a => a.Attachements)
                    .SingleOrDefault(w => w.Id == id).WeaponAttachements;
                if (p != null)
                {
                    return Ok(p);
                }
                return NotFound();
            }

            [HttpPost]
            public IActionResult CreateWeapon([FromBody] Weapon newWeapon)
            {
                context.Weapons.Add(newWeapon);
                context.SaveChanges();
                return Created("", newWeapon);
            }

            [Route("{Id}")] //api/v1/Weapon/2
            [HttpGet]
            public IActionResult GetWeapon(int id)
            {
                var Round = context.Weapons
                    .Include(c => c.Caliber)
                    .Include(c => c.Caliber)
                    .ThenInclude(c => c.Rounds)
                    .Include(f => f.Platform)
                    .Include(e => e.WeaponAttachements)
                    .ThenInclude(a => a.Attachements)
                    .FirstOrDefault(x => x.Id == id);
                if (Round == null)
                {
                    return NotFound();
                }
                return Ok(Round);
            }
            [Route("{Id}")]
            [HttpDelete]
            public IActionResult DeletRound(int id)
            {
                var weapon = context.Weapons.Find(id);
                if (weapon == null)
                {
                    return NotFound();
                }
                context.Weapons.Remove(weapon);
                context.SaveChanges();
                return NoContent();
            }
            [HttpPut]
            public IActionResult UpdateWeapon([FromBody] Weapon updateWeapon)
            {
                var orgWeapon = context.Weapons.Find(updateWeapon.Id);
                if (orgWeapon == null)
                {
                    return NotFound();
                }
                orgWeapon.Name = updateWeapon.Name;
                orgWeapon.Recoil = updateWeapon.Recoil;
                orgWeapon.PlatformId = updateWeapon.PlatformId;
                orgWeapon.CaliberId = updateWeapon.CaliberId;
                orgWeapon.WeaponAttachements = updateWeapon.WeaponAttachements;
                context.SaveChanges();
                return Ok(orgWeapon);
            }
            [Route("{id}/Attachement/{aId}")]
            [HttpPost]
            public IActionResult AddItemToPlayer(int id, int aId)
            {
                Weapon weapon = context.Weapons.Find(id);
                if (weapon == null)
                {
                    return NotFound();
                }
                Attachements attachement = context.Attachements.Find(aId);
                if (attachement == null)
                {
                    return NotFound();
                }
                WeaponAttachements wa = new WeaponAttachements
                {
                    Weapon = weapon,
                    Attachements = attachement
                };
                context.WeaponAttachements.Add(wa);
                context.SaveChanges();
                return Created("", wa);
            }
            [Route("{id}/Attachement/{aId}")]
            [HttpDelete]
            public IActionResult DeleteAttachementAndWeaponRelation(int id, int aId)
            {
                IQueryable<WeaponAttachements> query = context.WeaponAttachements.Where(pl => pl.WeaponId == id && pl.AttachementId == aId);
                if (query == null)
                {
                    return NotFound();
                }
                context.WeaponAttachements.Remove(query.FirstOrDefault());
                context.SaveChanges();
                return NoContent();
            }
        }
    }
}