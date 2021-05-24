using EindProjectCloudApi.Database;
using EindProjectCloudApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace EindProjectCloudApi.Controllers
{
    [Route("api/v1/WeaponPlatform")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class WeaponPlatformController : ControllerBase
    {
        private readonly BalisticsContext context;

        public WeaponPlatformController(BalisticsContext context)
        {
            this.context = context;
        }

        [HttpGet] //api/v1/WeaponPlatform
        public List<WeaponPlatform> GetAllPlatforms()
        {
            return context.WeaponPlatforms
                .Include(w => w.Weapons)
                .ThenInclude(c => c.WeaponAttachements)
                .ToList();
        }

        [HttpPost]
        public IActionResult CreatePlatform([FromBody] WeaponPlatform newPlatform)
        {
            context.WeaponPlatforms.Add(newPlatform);
            context.SaveChanges();
            return Created("", newPlatform);
        }

        [Route("{Id}")] //api/v1/WeaponPlatform/2
        [HttpGet]
        public IActionResult GetPlatform(int id)
        {
            var platform = context.WeaponPlatforms.Find(id);
            if (platform == null)
            {
                return NotFound();
            }
            return Ok(platform);
        }
        [Route("{id}/Weapon")]
        [HttpGet] //api/v1/Weapon
        public IActionResult GetWeaponForPlatform(int id)
        {
            var p = context.WeaponPlatforms.Include(w => w.Weapons)
                .ThenInclude(a => a.Caliber)
                .SingleOrDefault(w => w.Id == id).Weapons;
            if (p != null)
            {
                return Ok(p);
            }
            return NotFound();
        }
        [Route("{Id}")]
        [HttpDelete]
        public IActionResult DeletePlatform(int id)
        {
            var platform = context.WeaponPlatforms.Find(id);
            if (platform == null)
            {
                return NotFound();
            }
            context.WeaponPlatforms.Remove(platform);
            context.SaveChanges();
            return NoContent();
        }
        [HttpPut]
        public IActionResult UpdatePlatform([FromBody] WeaponPlatform updatePlatform)
        {
            var orgPlatform = context.Attachements.Find(updatePlatform.Id);
            if (orgPlatform == null)
            {
                return NotFound();
            }
            orgPlatform.Name = updatePlatform.Name;
            context.SaveChanges();
            return Ok(orgPlatform);
        }
    }
}
