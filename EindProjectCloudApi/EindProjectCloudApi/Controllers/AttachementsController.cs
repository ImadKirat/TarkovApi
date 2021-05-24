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
    [Route("api/v1/Attachement")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AttachementsController : ControllerBase
    {
        private readonly BalisticsContext context;

        public AttachementsController(BalisticsContext context)
        {
            this.context = context;
        }

        [HttpGet] //api/v1/Attachements
        public List<Attachements> GetAllAttachements()
        {
            return context.Attachements.ToList();
        }
        [Route("{id}/weapons")]
        [HttpGet]
        public IActionResult GetAttachementForWeapon(int id)
        {
           var attachement = context.Attachements
                .Include(wa => wa.WeaponAttachements)
                .ThenInclude(w => w.Weapon)
                .SingleOrDefault(w => w.Id == id).WeaponAttachements;
            if (attachement != null)
            {
                return Ok(attachement);
            }
            return NotFound();
        }

        [HttpPost]
        public IActionResult CreateAttachement([FromBody] Attachements newAttachements)
        {
            context.Attachements.Add(newAttachements);
            context.SaveChanges();
            return Created("", newAttachements);
        }

        [Route("{Id}")] //api/v1/Attachements/2
        [HttpGet]
        public IActionResult GetAttachements(int id)
        {
            var attachements = context.Attachements.Find(id);
            if (attachements == null)
            {
                return NotFound();
            }
            return Ok(attachements);
        }
        [Route("{Id}")]
        [HttpDelete]
        public IActionResult DeletAttachement(int id)
        {
            var attachements = context.Attachements.Find(id);
            if (attachements == null)
            {
                return NotFound();
            }
            context.Attachements.Remove(attachements);
            context.SaveChanges();
            return NoContent();
        }
        [HttpPut]
        public IActionResult UpdateAttachements([FromBody] Attachements updateAttachement)
        {
            var orgAttachement = context.Attachements.Find(updateAttachement.Id);
            if (orgAttachement == null)
            {
                return NotFound();
            }
            orgAttachement.Name = updateAttachement.Name;
            context.SaveChanges();
            return Ok(orgAttachement);
        }
    }
}

